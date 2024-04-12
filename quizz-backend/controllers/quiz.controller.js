const httpStatus = require('http-status');
const mongoose = require('mongoose');
const catchAsync = require('../utils/catchAsync');
const { quizService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { Question, UserAnswer } = require('../models');
const UserParticipation = require('../models/participation.model');

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
  console.log('req.body',req.body);
  const authUserId = req?.user?._id || null;
  console.log('authUserId',authUserId);
  
  const quiz = await quizService.getQuizById(req.params.quiz_id, authUserId);
  console.log('quiz',quiz);
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

const getQuizLeaderboard = catchAsync(async (req, res) => {
  try {
    const userId = req.user.id;
    let topThreeRanker;

    const { leaderboard, page } = await quizService.getQuizLeaderboard(
      req.params.quiz_id,
      userId,
      req.query.page,
      req.query.limit,
      req.query.user_rank
    );
    if (!leaderboard) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Quiz not found');
    }

    const totalQuestionsInQuiz = await Question.countDocuments({ quiz: req.params.quiz_id });

    return res.json(
      success(httpStatus.OK, 'Quiz leaderboard retrieved successfully', {
        leaderboard,
        total_questions: totalQuestionsInQuiz,
        page,
        topThreeRanker,
      })
    );
  } catch (error) {
    console.log('error in getQuizLeaderboard', error);
  }
});

const getQuizUserSummary = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const quizSummary = await quizService.getQuizUserSummary(req.params.quiz_id, userId);
  if (!quizSummary) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User did not participate in this quiz');
  }

  res.json(success(httpStatus.OK, 'Quiz summary retrieved successfully', quizSummary));
});

const deleteAllUserAnswerAndParticipation = catchAsync(async (req, res) => {
  await UserAnswer.deleteMany({});
  await UserParticipation.deleteMany({});

  res.json(success(httpStatus.OK, 'All user answer and participation deleted successfully'));
});

module.exports = {
  createQuiz,
  getQuiz,
  getQuizes,
  updateQuiz,
  getQuizesOverview,
  voteQuizCategory,
  getQuizVotes,
  getQuizQuestions,
  createQuizLiveStream,
  getQuizLeaderboard,
  getQuizUserSummary,
  getTopThreeRankerInQuiz,
  // patchQuizLive,
  deleteAllUserAnswerAndParticipation,
  getAllQuizesWithDetails,
};
