const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { LiveStream } = require('../models');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const livequiz = require('../models/live-quiz.model');
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

  console.log('##########getQuizeStategetQuizeStategetQuizeState');

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
    console.log('getModalQuizLeaderboard', req.params);
  
    // Fetching and sorting the user list
    let  userList = await UserActivity.find().sort({ correct: -1 });
    // Calculate user rank and retrieve the specific user
    let rank = 0;
    let indexOfUser = userList.findIndex((user, index) => {
      if (user.user.toString() === req.params.quiz_id) {
        rank = index;
        return true;
      }
      rank++;
      return false;
    });

    // If specific user not found, send an appropriate response
    if (indexOfUser === -1) {
      return res.json(success(httpStatus.NOT_FOUND, 'User not found in the leaderboard', {}));
    }

    // Add rank to user detail
    userList[indexOfUser].time = rank;

    // Sending success response
    res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', userList[indexOfUser]));
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);

    // Sending error response
    return next(new AppError('Failed to fetch leaderboard', httpStatus.INTERNAL_SERVER_ERROR));
  }
});

const calculateQuizLeaderboard = catchAsync(async (req, res) => {
  try {
    let docs = await UserActivity.find({ role: { $ne: 'shadow' } });
    console.log(docs.length);
    console.log('UserActivity', docs);
    for (let i = 0; i < docs.length; i++) {
      let info = await UserAnswer.find({
        username: docs[i].username,
      });

      let time = 0;
      let correct = 0;

      for (let i = 0; i < info.length; i++) {
        if (info[i].duration != undefined) {
          time += parseFloat(info[i].duration);
        }

        if (info[i].state == 'true') {
          correct++;
        }
      }

      const result = await UserActivity.updateOne(
        { username: docs[i].username },
        { $set: { time: time, correct: correct } }
      );
    }

    res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', 'userList'));
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
  }
});
const getQuizLeaderboard = catchAsync(async (req, res) => {
  try {
    const userList = await UserActivity.find().sort({ correct: -1 }); //

    res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', userList));
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
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
  console.log('result', result);

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
