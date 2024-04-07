const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { userAnswerService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createUserAnswer = catchAsync(async (req, res) => {
    const userAnswer = await userAnswerService.createUserAnswer(req.body);
    res.status(httpStatus.CREATED).send(userAnswer);
});

const getUserAnswer = catchAsync(async (req, res) => {
    const userAnswer = await userAnswerService.getUserAnswerById(req.params.userAnswer_id);
    if (!userAnswer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserAnswer not found');
    }
    res.json(success(httpStatus.OK, 'UserAnswer retrieved successfully', userAnswer));
});

const getUserAnswers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['quiz', 'user', 'question', 'option']);

    const userAnswers = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await userAnswerService.queryUserAnswers(filter, userAnswers);
    res.json(success(httpStatus.OK, 'UserAnswers retrieved successfully', result));
});

const updateUserAnswer = catchAsync(async (req, res) => {
    const userAnswer = await userAnswerService.updateUserAnswerById(req.params.userAnswer_id, req.body);
    res.json(success(httpStatus.OK, 'UserAnswer updated successfully', userAnswer));
});

module.exports = {
    createUserAnswer,
    getUserAnswer,
    getUserAnswers,
    updateUserAnswer,
};
