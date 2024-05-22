const socketio = require('socket.io');
const { ObjectId } = require('mongodb');
const LiveStream = require('../models/live-stream.model');
const QuizQuestion = require('../models/question.model');
const UserParticipation = require('../models/participation.model');
const UserAnswer = require('../models/user-answer.model');
const Option = require('../models/option.model');
const UserActivity = require('../models/user-activity.model');
const { questionService } = require('../services');
const { calculateLeaderboard } = require('../services/quiz.service');
const { Leaderboard, User } = require('../models');
const { getNumberOfUsersInChannel } = require('../services/agora.service');
const liveQuiz = require('../models/live-quiz.model');
const quizticket = require('../models/quizticket.model');

let amount = 50;
let playCount = 0;
let viewer_count = 0;
const quizPoolData = { amount: 50, playCount: 0 };
const initaliseWebSocket = (server) => {
  try {
    const io = socketio(server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    io.on('connection', (socket) => {
      // create listener when host starts live stream on a quiz and creates a room and emits room code
      socket.on('host_live_start', async (data) => {
        // get room_id from livestreams collection via quiz_id and host_id
        const { quiz_id, host_id } = data;
        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        if (!liveStream) {
          console.log('live stream not found');
          return;
        }
        await UserActivity.deleteMany({});
        await UserAnswer.deleteMany({});
        await UserParticipation.deleteMany({});

        // updated LiveStream status to ongoing
        liveStream.status = 'ongoing';
        liveStream.start_time = new Date();
        liveStream.viewer_count = 0;
        // TODO: remove this after testing
        // liveStream.room_id = liveStream.room_id + 1;
        await liveStream.save();
        const room = liveStream.room_id;

        // create room
        socket.join(room);

        // emit quiz live emitting quiz_id and room_id

        // TODO: Pending in #APP
        const channelViewerCount = await getNumberOfUsersInChannel('test');
        io.emit('quiz_live_start', { quiz_id, room_id: room });

        io.in(room).emit('user_quiz_live_viewer_count', { viewer_count: viewer_count });
        console.log('quiz_live_start', viewer_count);
        // emit quiz live emitting quiz_id and room_id
        // TODO: rethink this implementation
        // io.emit('user_quiz_live_start', { quiz_id });
      });

      socket.emit('amount_update_user_broadcast', quizPoolData); // Send the initial amount

      socket.on('increase_pool_amount_user', async (data) => {
        const newData = new quizticket({
          email: data.email,
          ticket: data.ticket,
          quiz: data.quiz_id,
        });
        await newData
          .save()
          .then((res) => {
            console.log('res');
          })
          .catch((err) => {
            console.log(err);
          });
        amount++;
        playCount++;

        const channelViewerCount = await getNumberOfUsersInChannel('test');
        const quizPoolData = { amount: amount, playCount: playCount, channelViewerCount: viewer_count - playCount };
        try {
          await liveQuiz.deleteMany({});
          console.log('Successful deletion');
        } catch (err) {
          console.error(err);
        }

        const newData1 = new liveQuiz({
          status: 'showpool',
          pool: amount,
          contestants: playCount,
          viewer_count: viewer_count - playCount,
        });

        await newData1
          .save()
          .then((res) => {
            console.log('res');
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('increase_amount_pool_host_user');
        io.emit('amount_update_user_broadcast', quizPoolData); // Send the updated amount to all clients

        io.emit('increase_amount_pool_host_user', quizPoolData); // Send the updated amount to all clients
      });
      // socket to pause and resume the live stream
      socket.on('host_live_change', async (data) => {
        // get room_id from livestreams collection via quiz_id and host_id

        const { quiz_id, host_id, status } = data;
        if (!status || (status != 'paused' && status != 'ongoing')) {
          return;
        }
        if (status == 'paused') {
          try {
            await liveQuiz.deleteMany({});
            console.log('Successful deletion');
          } catch (err) {
            console.error(err);
          }
          const newData = new liveQuiz({
            status: 'paused',
          });

          await newData
            .save()
            .then((res) => {
              console.log('res');
            })
            .catch((err) => {
              console.log(err);
            });
        }
        // Check if the livestream exists
        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        if (!liveStream) {
          return;
        }

        // Update the livestream status
        liveStream.status = status;
        await liveStream.save();

        // Emit the quiz live change event to all the users in the room
        io.in(liveStream.room_id).emit('user_quiz_live_change', { quiz: quiz_id, status });
      });

      socket.on('host_show_pool', async (data) => {
        console.log('host_show_pool####');
        const { quiz_id, host_id } = data;

        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        // TODO: calculate the leaderboard and emit the result to the host and users
        if (!liveStream) {
          console.log('liveStream not found');
          return;
        }
        try {
          await liveQuiz.deleteMany({});
          console.log('Successful deletion');
        } catch (err) {
          console.error(err);
        }
        if (data.status === 'hide') {
          const newData = new liveQuiz({
            status: 'quiz_end',
          });

          await newData
            .save()
            .then((res) => {
              console.log('res');
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          const newData = new liveQuiz({
            status: 'showpool',
          });

          await newData
            .save()
            .then((res) => {
              console.log('res');
            })
            .catch((err) => {
              console.log(err);
            });
        }

        const room = liveStream.room_id;
        data.room_id = room;
        io.in(room).emit('user_show_pool', data);
      });

      socket.on('host_live_quiz_calculation_start', async (data) => {
        // get room_id from livestreams collection via quiz_id and host_id
        const { quiz_id, host_id } = data;
        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        console.log('host_live_quiz_calculation_start');
        // TODO: calculate the leaderboard and emit the result to the host and users
        if (!liveStream) {
          console.log('liveStream not found');
          return;
        }
        // emit live quiz calculation start to all the users in the room

        const room = liveStream.room_id;

        io.in(room).emit('user_quiz_live_calculation_start', { quiz: quiz_id });

        // TODO: another emit to send the leaderboard to the host and users

        // TODO: to be removed after testing #Remove #Testing
        await Leaderboard.deleteMany({ quiz: quiz_id });

        await calculateLeaderboard(quiz_id);

        // for now settimg a timeout of 10 seconds to send the result
        try {
          await liveQuiz.deleteMany({});
          console.log('Successful deletion');
        } catch (err) {
          console.error(err);
        }

        setTimeout(() => {
          viewer_count = 0;
          io.in(room).emit('user_quiz_live_calculation_end', { quiz: quiz_id });
          console.log('quiz_id',quiz_id);
          io.emit('host_quiz_live_calculation_end', { quiz: quiz_id });
        }, 5000);
      });

      socket.on('host_live_end', async (data) => {
        try {
          const { quiz_id, host_id } = data;
          console.log('host_live_end');
          // Find the corresponding LiveStream document
          const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
          amount = 50;
          playCount = 0;
          await liveQuiz.deleteMany({});
          // Update LiveStream status and end time
          liveStream.status = 'completed';
          liveStream.end_time = new Date();
          await liveStream.save();
          const room = liveStream.room_id;

          await UserActivity.deleteMany({});
          //   io.emit('user_quiz_live_calculation_end', { quiz: quiz_id });
          viewer_count = 0;
          io.in(room).emit('user_quiz_live_end', { quiz: quiz_id });
          // TODO: rethink this implementation
          // io.emit('user_quiz_live_start', { quiz_id });

          // TODO: to be removed after testing
          // Delete all user answer data for the quiz
          await UserAnswer.deleteMany({ quiz: quiz_id });

          // Close the room and disconnect all sockets
          // TODO: check if this is the right way to close the room
          // io.of('/')
          //   .in(room)
          //   .fetchSockets()
          //   .then((sockets) => {
          //     sockets.forEach((socket) => {
          //       socket.disconnect(true);
          //     });
          //   })
          //   .catch((error) => {
          //     console.error(`Error: ${error}`);
          //   });
        } catch (error) {
          // Handle any potential errors
          console.error('An error occurred while ending the live stream:', error);
        }
      });

      // display question trigger
      socket.on('host_live_quiz_question_start', async (data) => {
        // get room_id from livestreams collection via quiz_id and host_id
        console.log('host_live_quiz_question_star');
        const { quiz_id, host_id, question_id, question_index } = data;
        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        if (!liveStream) {
          return;
        }

        try {
          await liveQuiz.deleteMany({});
          console.log('Successful deletion');
        } catch (err) {
          console.error(err);
        }

        const room = liveStream.room_id;

        const quizQuestion = await questionService.getQuestionById(question_id);

        const totalNumberOfQuestions = await QuizQuestion.countDocuments({ quiz: new ObjectId(quiz_id) });
        const newData = new liveQuiz({
          status: 'quiz',
          question_id: question_id,
          question_index: question_index,
          total_questions: totalNumberOfQuestions,
        });
        await newData
          .save()
          .then((res) => {
            console.log('res');
          })
          .catch((err) => {
            console.log(err);
          });
        console.log('user_quiz_live_question');
        // emit quiz live emittin,g quiz_id and room_id
        io.in(room).emit('user_quiz_live_question', {
          question: quizQuestion,
          question_index,
          total_questions: totalNumberOfQuestions,
        });
      });
      /////////////////////////////////////////////////
      // socket to display all the options of the question
      socket.on('host_live_quiz_question_options', async (data) => {
        // get room_id from livestreams collection via quiz_id and host_id
        const { quiz_id, host_id, question_id } = data;

        if (!data || !quiz_id || !host_id || !question_id) {
          console.log('host_live_quiz_question_options :: data not found');
          return;
        }

        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        if (!liveStream) {
          return;
        }

        const filter = { question_id: question_id };
        const update = { status: 'quiz_answer' };

        // `doc` is the document _before_ `updateOne()` was called
        let doc = await liveQuiz.updateOne(filter, update);
        // const newData = new liveQuiz({
        //   status: 'quiz_answer',
        //   question_id: question_id,
        // });
        // await newData
        //   .save()
        //   .then((res) => {
        //     console.log('res');
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
        const room = liveStream.room_id;

        const quizQuestions = await questionService.getQuestionWithOption(question_id);
        console.log('user_quiz_live_question_options');
        io.in(room).emit('user_quiz_live_question_options', { question: quizQuestions });
      });

      socket.on('host_mute_state', async (data) => {

        io.emit('user_mute', data);

        console.log('host_mute_state', data);
      });
      // display question end
      socket.on('host_live_quiz_question_end', async (data) => {
        if (!data || !data.quiz_id || !data.host_id || !data.question_id) {
          return;
        }
        console.log('host_live_quiz_question_end');
        // get room_id from livestreams collection via quiz_id and host_id
        const { quiz_id, host_id, question_id, is_last } = data;
        console.log('question_id, is_last', question_id, is_last);
        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id), host: new ObjectId(host_id) });
        if (!liveStream) {
          return;
        }

        const filter = { question_id: question_id };
        const update = { status: 'quiz_end' };

        // `doc` is the document _before_ `updateOne()` was called
        let doc = await liveQuiz.updateOne(filter, update);
        let doc1 = await QuizQuestion.find({ quiz: quiz_id });
        let position = 0;
        for (let i = 0; i < doc1.length; i++) {
          if (doc1[i]._id.toString() == question_id) {
            break;
          } else {
            position++;
          }
        }

        const room = liveStream.room_id;
        console.log('new ObjectId(question_id)}', new ObjectId(question_id));
        const userAnswered = await UserAnswer.find({ question: new ObjectId(question_id) });
        let correct = 0;
        console.log('userAnswered',userAnswered);
        for (let i = 0; i < userAnswered.length; i++) {
          if (userAnswered[i].state == 'true') {
            correct++;
          }
        }
        let percent;

        if (viewer_count != 0 && correct != 0) {
          percent = (correct / viewer_count) * 100;
        } else {
          // handle it in a way that makes sense for your application
          // perhaps setting percent to 0 or some default
          percent = 0; // or some default value
        }
        console.log('userAnswered',correct,viewer_count, percent);

        const quizQuestions = await questionService.getQuestionWithOptionAndTotalAnswers(question_id);

        io.in(room).emit('user_quiz_live_question_end', { question: quizQuestions, quiz_id: quiz_id });
        const percentData = {
          position: position,
          correctAnswerPercent: percent,
        };
    
        // TODO: another tigger with question result with percentage correct answer
        io.emit('user_quiz_live_question_result', percentData);

        // TODO: improve this implementation
        if (is_last) {
          // triggered when the last question of the quiz is asked
          io.in(room).emit('user_quiz_last_question', {});
        }

        // TODO: another trigger to send correct answer of the question to the user
        // io.in(room).emit('user_quiz_live_question_answer', {});
      });
      socket.on('user_useranswer_save', async (data) => {
        console.log('user_useranswer_save');
        const { quiz_id,  question_id,username,user_id } = data;
        let questionExit = await UserAnswer.find({ question: question_id });
        const question_text=await QuizQuestion.findOne({_id:question_id});

       if (questionExit.length === 0) { 
          const userAnswer = new UserAnswer({
            state: 'No Answer',
            username: username,
            question_text:question_text.text,
            answer: '',
            quiz: quiz_id,
            user: user_id,
            question: question_id,
          });
          
          await userAnswer.save();
        }
      });

      socket.on('user_join_live_quiz', async (data) => {
        if (!data || !data.quiz_id || !data.user_id) {
          return;
        }
        const { quiz_id, user_id, avatar, username ,role} = data;

        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id) });

        if (!liveStream) {
          return;
        }

        const room = liveStream.room_id;

        const userParticipation = await UserParticipation.findOne({
          quiz: new ObjectId(quiz_id),
          user: new ObjectId(user_id),
        });

        if (userParticipation) {
          // update user participation status to ongoing
          userParticipation.status = 'ongoing';
          userParticipation.socketId = socket.id;
          await userParticipation.save();
        } else {
          // get type of user if shadow or registered
          const userPart = await User.findOne({ _id: new ObjectId(user_id) }, { role: 1 });
          const participation = new UserParticipation({
            quiz: quiz_id,
            user: user_id,
            socketId: socket.id,
            status: 'ongoing',
            user_type: userPart.role === 'shadow' ? 'shadow' : 'registered',
          });

          await participation.save();
        }

        const userActivity_exist = await UserActivity.findOne({ user: new ObjectId(user_id) });
        let quiz_question = await QuizQuestion.find({ quiz: quiz_id });
       
        if (!userActivity_exist) {
          const userActivity = new UserActivity({
            quiz: quiz_id,
            user: user_id,
            avatar: avatar,
            role:role,
            username: username,
            totalquestion: quiz_question.length,
          });
          await userActivity.save();
        }

        // update viewer count in live stream and emit to users
        ++liveStream.viewer_count;

        await liveStream.save();
        // join room
        socket.join(room);
        if (data.state != 'refresh') {
          console.log('rejoin');
          viewer_count++;
        }

        // TODO: fix the channel name implementation as for now it is hardcoded
        const channelViewerCount = await getNumberOfUsersInChannel('test');
        console.log('user_join_live_quiz', viewer_count);
        setTimeout(() => {
          io.in(room).emit('user_quiz_live_viewer_count', { viewer_count: viewer_count });
        }, 1500);
      });

      socket.on('user_leave_live_quiz', async (data) => {
        if (!data || !data.quiz_id || !data.user_id) {
          return;
        }
        const { quiz_id, user_id } = data;

        // update user participation status to completed
        await UserParticipation.updateOne(
          { quiz: new ObjectId(quiz_id), user: new ObjectId(user_id) },
          { status: 'completed' }
        );

        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id) });

        if (!liveStream) {
          return;
        }

        const room = liveStream.room_id;

        // update viewer count in live stream and emit to users

        // reduce viewer count
        --liveStream.viewer_count;

        await liveStream.save();

        if (viewer_count > 0) {
          viewer_count--;
        }
        // TODO: fix the channel name implementation as for now it is hardcoded
        const channelViewerCount = await getNumberOfUsersInChannel('test');

        console.log('user_leave_live_quiz', viewer_count);
        // emit to users

        io.in(room).emit('user_quiz_live_viewer_count', { viewer_count: viewer_count });

        // remove user from room

        socket.leave(room);
      });

      socket.on('user_send_emoji', async (data) => {
        console.log('user_send_emoji');
        if (!data || !data.quiz_id) {
          return;
        }
        io.emit('host_emoji_received', data.emoji_no);
      });
      socket.on('user_submit_live_quiz_answer', async (data) => {
        if (!data || !data.quiz_id || !data.user_id || !data.question_id || !data.option_id) {
          return;
        }
        console.log('user_submit_live_quiz_answer', data);
        const { username, quiz_id, user_id, question_id, option_id, duration } = data;

        const liveStream = await LiveStream.findOne({ quiz: new ObjectId(quiz_id) });
        io.emit('user_submit_live_quiz_answer', data);
        if (!liveStream) {
          return;
        }
        
        const room = liveStream.room_id;

        // check if user has already answered the question
        const alreadyAnswered = await UserAnswer.findOne({
          quiz: new ObjectId(quiz_id),
          user: new ObjectId(user_id),
          question: new ObjectId(question_id),
        });
      
        if (alreadyAnswered) {
          console.error('user_submit_live_quiz_answer :: user already answered the question');
          return;
        }
        const optionInfo=await Option.findOne({_id:option_id});
        console.log('optionInfo1',optionInfo);
        let state = 'No answer';
        if (optionInfo.is_correct == true) {
          state = 'true';
        } else {
          state = 'false';
        }
        const question_text=await QuizQuestion.findOne({_id:question_id});
        const userAnswer = new UserAnswer({
          state: state,
          question_text:question_text.text,
          username: username,
          answer: optionInfo.text,
          quiz: quiz_id,
          user: user_id,
          question: question_id,
          option: option_id,
          duration,
        });
        console.log('userAnswer', userAnswer);
        await userAnswer.save();

        // make the user as a viewer. // TODO: rethink this implementation

        // TODO: check this #IMP #Looks waste

        // group by options and count total answers for the question and if no option then count as 0
        const totalAnswers = await Option.aggregate([
          {
            $match: {
              question: new ObjectId(question_id),
            },
          },
          {
            $lookup: {
              from: 'useranswers',
              localField: '_id',
              foreignField: 'option',
              as: 'user_answers',
            },
          },
          {
            $project: {
              _id: 1,
              text: 1,
              is_correct: 1,
              total_answers: {
                $size: '$user_answers',
              },
            },
          },
        ]);

        // const userPart = await UserParticipation.findOne({
        //   quiz: new ObjectId(quiz_id),
        //   user: new ObjectId(user_id),
        // });

        // emit to all the users who has answered the question

        const UserAnswers = await UserAnswer.find({ quiz: new ObjectId(quiz_id), question: new ObjectId(question_id) });

        const userIds = UserAnswers.map((user) => user.user);

        const userParts = await UserParticipation.find({
          quiz: new ObjectId(quiz_id),
          user: { $in: userIds },
        });

        userParts.forEach((userPart) => {
          if (userPart) {
            // only emit to the user who answered the question
            io.to(userPart.socketId).emit('user_quiz_live_question_answer', { totalAnswers, user_id });
          } else {
            console.log('user_submit_live_quiz_answer :: user not found');
          }
        });

        // if (userPart) {
        //   // only emit to the user who answered the question
        //   io.to(userPart.socketId).emit('user_quiz_live_question_answer', { totalAnswers, user_id });
        // } else {
        //   console.log('user_submit_live_quiz_answer :: user not found');
        // }
      });
    });

    io.on('disconnect', () => {
      console.log('user disconnected');
      io.emit('user disconnected');
    });
  } catch (error) {
    console.error('An error occurred in WebSocket:', JSON.stringify(error));
  }
};

module.exports = initaliseWebSocket;
