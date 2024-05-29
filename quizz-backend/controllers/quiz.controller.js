const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { LiveStream } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const livequiz = require('../models/live-quiz.model');
const User = require('../models/user.model');
const { Question, UserAnswer } = require('../models');
const UserParticipation = require('../models/participation.model');
const { questionService } = require('../services');
const UserActivity = require('../models/user-activity.model');

const createQuiz = catchAsync(async (req, res) => {
  const mongooseSession = await mongoose.startSession();

  mongooseSession.startTransaction();
  try {
    const quiz = await quizService.createQuiz(req.body, mongooseSession);

    await quizService.createQuizLiveStream(quiz._id, req.body.host, mongooseSession);

    await mongooseSession.commitTransaction();
    mongooseSession.endSession();

    res.status(httpStatus.CREATED).send(quiz);
  } catch (error) {
    console.log(error);
    await mongooseSession.abortTransaction();
    mongooseSession.endSession();
    throw error;
  }
});

const getQuiz = catchAsync(async (req, res) => {
  const authUserId = req?.user?._id || null;

  const quiz = await quizService.getQuizById(req.params.quiz_id, authUserId);

  if (!quiz) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
  }
  res.json(success(httpStatus.OK, 'Quiz retrieved successfully', quiz));
});

const voteQuizCategory = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const quizVote = await quizService.voteQuizCategory(req.params.quiz_id, req.params.category_id, userId);
  if (!quizVote) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
  }
  res.json(success(httpStatus.OK, 'Quiz voted successfully', quizVote));
});

const getQuizes = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['host', 'category', 'is_paid', 'upcoming']);

  if (filter.upcoming) {
    filter.start_date = { $gte: new Date() };
    delete filter.upcoming;
  }
  // TODO: fix #Urgent
  filter.start_date = { $gte: new Date() };

  const options = pick(req.query, ['sort_by', 'limit', 'page']);

  const authUserId = req?.user?._id || null;

  const result = await quizService.queryQuizes(filter, options, authUserId);

  res.json(success(httpStatus.OK, 'Quizes retrieved successfully', result));
});

const getQuizeState = catchAsync(async (req, res) => {
  let docs;
  try {
    docs = await livequiz.find({});
  } catch (err) {
    console.error(err);
  }

  if (docs) {
    res.json(success(httpStatus.OK, 'successfully', docs[0]));
  } else {
    // handle the situation when docs are not fetched
  }
});
const getQuestion = catchAsync(async (req, res) => {
  const quizQuestion = await questionService.getQuestionWithOption(req.body.question_id);

  res.status(200).json({ question: quizQuestion });
});
const getOnlyQuestion = catchAsync(async (req, res) => {
  const quizQuestion = await questionService.getQuestionById(req.body.question_id);
  res.status(200).json({ question: quizQuestion });
});
const getAllQuizesWithDetails = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['host', 'category', 'is_paid', 'upcoming', '_id']);

  if (filter.upcoming) {
    filter.start_date = { $gte: new Date() };
    delete filter.upcoming;
  }

  const options = pick(req.query, ['sort_by', 'limit', 'page']);

  const result = await quizService.queryQuizesWithDetails(filter, options);

  res.json(success(httpStatus.OK, 'successfully', result));
});

const updateQuiz = catchAsync(async (req, res) => {
  const quiz = await quizService.updateQuizById(req.params.quiz_id, req.body);
  let updatedDoc = await LiveStream.updateOne(
    { quiz: req.params.quiz_id }, // Condition to match the documents you want to update.
    {
      $set: {
        host: req.body.host,
      },
    }
  );

  res.json(success(httpStatus.OK, 'Quiz updated successfully', quiz));
});

const getQuizesOverview = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['paid', 'free']);
  const result = await quizService.getQuizesOverview(filter);

  res.json(success(httpStatus.OK, 'Quizes overview retrieved successfully', result));
});

const getQuizVotes = catchAsync(async (req, res) => {
  const votes = await quizService.getQuizVotes(req.params.quiz_id);
  if (!votes) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
  }

  res.json(success(httpStatus.OK, 'Quiz vote retrieved successfully', votes));
});

const getQuizQuestions = catchAsync(async (req, res) => {
  const questions = await quizService.getQuizQuestions(req.params.quiz_id);
  if (!questions) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
  }

  res.json(success(httpStatus.OK, 'Quiz questions retrieved successfully', questions));
});

const createQuizLiveStream = catchAsync(async (req, res) => {
  const transaction = await mongoose.startSession();
  try {
    const quiz = await quizService.createQuizLiveStream(req.params.quiz_id, req.user.id, transaction);
    if (!quiz) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
    }

    await transaction.commitTransaction();
    transaction.endSession();

    res.json(success(httpStatus.OK, 'Quiz is live now!', quiz));
  } catch (error) {
    await transaction.abortTransaction();
    transaction.endSession();
    throw error;
  }
});

// const patchQuizLive = catchAsync(async (req, res) => {
//     const quiz = await quizService.patchQuizLive(req.params.quiz_id, req.body.status, req.user.id);
//     if (!quiz) {
//         throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
//     }

//     res.json(success(httpStatus.OK, 'Quiz is live now!', quiz));
// });

const getTopThreeRankerInQuiz = catchAsync(async (req, res) => {
  const topThreeRanker = await quizService.getTopThreeRankerInQuiz(req.params.quiz_id);

  if (!topThreeRanker) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Something went wrong');
  }

  return res.json(success(httpStatus.OK, 'Top three ranker retrieved successfully', topThreeRanker));
});

const getModalQuizLeaderboard = catchAsync(async (req, res, next) => {
  try {
    let updatedUserActivityTable = await UserActivity.find({ role: { $ne: 'shadow' } });
    let total = 0;
    let spliteCredit = 0;
    let rewardAmount = 0,
      rewardCredit = 0;
    for (let i = 0; i < updatedUserActivityTable.length; i++) {
      if (updatedUserActivityTable[i].allQuestionCorrect == true) {
        total++;
      }
    }
    let result = await UserActivity.findOne({ user: req.params.quiz_id });
    // Calculate user rank and retrieve the specific user
    console.log('result', result);
    spliteCredit = Math.floor((result.pool / 2) * 3);

    if (result.usedticket == true) {
      switch (result.rank) {
        case 1:
          rewardAmount = Math.floor(result.pool / 2);
          rewardCredit = 0;
          break;
        case 2:
          rewardAmount = Math.floor(result.pool / 4);
          rewardCredit = 0;
          break;
        case 3:
          rewardAmount = Math.floor(result.pool / 10);
          rewardCredit = 0;
          break;
      }

      if (result.allNumberCorrect === true && result.rank > 3) {
        if (total === 4) {
          rewardAmount = 0;
          rewardCredit = result.pool;
        } else {
          rewardAmount = 0;
          if (spliteCredit > result.pool) {
            rewardCredit = result.pool;
          } else {
            rewardCredit = spliteCredit;
          }
        }
      }

      await UserActivity.updateOne({ user: req.params.quiz_id }, { rewardCredit: rewardCredit, rewardAmount: rewardAmount });

      await User.updateOne(
        { _id: req.params.quiz_id }, // Make sure req.params.quiz_id is defined and valid
        {
          $inc: {
            amount: rewardAmount, // Ensure 'reward' is defined and a numeric value
            credit: rewardCredit,
          },
        }
      );
      console.log('rewardAmount', rewardAmount, 'rewardCredit', rewardCredit);
    }
    let userInfo = await User.findOne({ _id: req.params.quiz_id });
    let finalResult = await UserActivity.findOne({ user: req.params.quiz_id });
    const userList = { result: finalResult, amount: userInfo.amount,ticket:userInfo.ticket, credit: userInfo.credit };
    // Sending success response
    res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', userList));
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
  }
});

const calculateQuizLeaderboard = catchAsync(async (req, res) => {
  try {
    let updatedUserActivityTable = await UserActivity.find();
    for (let i = 0; i < updatedUserActivityTable.length; i++) {
      let info = await UserAnswer.find({
        username: updatedUserActivityTable[i].username,
      });

      let time = 0;
      let correct = 0;
      let allQuestionCorrect = false;
      for (let i = 0; i < info.length; i++) {
        if (typeof info[i].duration === 'number') {
          time += parseFloat(info[i].duration.toFixed(2));
        }

        if (info[i].state == 'true') {
          correct++;
        }
      }
      if (correct == info.length) {
        allQuestionCorrect = true;
      }
      const result = await UserActivity.updateOne(
        { username: updatedUserActivityTable[i].username },
        { $set: { time: time, correct: correct, allQuestionCorrect: allQuestionCorrect } }
      );
    }
    const docs = await UserActivity.find({ role: 'user' }).sort({ correct: -1, time: 1 });
    console.log('docs', docs);
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
      const bulkOps = docs.map((doc, index) => {
        return {
          updateOne: {
            filter: { _id: doc._id },
            update: { $set: { rank: index + 1 } },
          },
        };
      });

      await UserActivity.bulkWrite(bulkOps, { session });
      await session.commitTransaction();
    } catch (error) {
      console.error('Error occurred while updating user ranks: ', error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }

    res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', 'userList'));
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
  }
});
const getQuizLeaderboard = catchAsync(async (req, res) => {
  try {
    const userList = await UserActivity.find({ role: 'user' }).sort({ rank: 1 });

    for (let i = 0; i < userList.length; i++) {
      const { user: userId } = userList[i];
      const { avatar: userAvatar } = await User.findById(userId);

      await UserActivity.updateOne({ user: userId }, { avatar: userAvatar });
    }

    const updatedUserList = await UserActivity.find({ role: 'user' }).sort({ rank: 1 });
    const transformedList = updatedUserList.map(user => {
      return {
        ...user._doc,  // this will spread all of the user attributes
        _id: user._id.toString(), // convert _id ObjectId to string
        quiz: user.quiz.toString(),  // convert quiz ObjectId to string,
        user: user.user.toString()  // convert user ObjectId to string
      }
    });
    console.log('updatedUserList',transformedList);
    return res.status(httpStatus.OK).json({
      status: 'success',
      message: 'Quiz summary retrieved successfully',
      data: transformedList,
    });
  } catch (error) { 
    logger.error('Error getting Quiz Leaderboard:', error);

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: `An error occurred when fetching the quiz leaderboard: ${error}`,
    });
  }
});

const getLiveQuiz = catchAsync(async (req, res) => {
  const quiz_id = req.params.quiz_id;

  LiveStream.findOne({ quiz: quiz_id })
    .then((livestream) => {
      const result = livestream;
      res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', result));
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: 'An error occurred' }); // send an error response
    });
});

const getQuizUserSummary = catchAsync(async (req, res) => {
  const { quizId } = req.params;

  const result = await UserAnswer.find({ user: quizId });

  res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', result));
});

const deleteAllUserAnswerAndParticipation = catchAsync(async (req, res) => {
  await UserAnswer.deleteMany({});
  await UserParticipation.deleteMany({});

  res.json(success(httpStatus.OK, 'All user answer and participation deleted successfully'));
});

module.exports = {
  createQuiz,
  getQuiz,
  getLiveQuiz,
  getQuestion,
  getQuizes,
  updateQuiz,
  getQuizesOverview,
  voteQuizCategory,
  getQuizVotes,
  getQuizQuestions,
  getModalQuizLeaderboard,
  createQuizLiveStream,
  getQuizLeaderboard,
  getQuizUserSummary,
  getOnlyQuestion,
  getTopThreeRankerInQuiz,
  getQuizeState,
  calculateQuizLeaderboard,
  // patchQuizLive,
  deleteAllUserAnswerAndParticipation,
  getAllQuizesWithDetails,
};
