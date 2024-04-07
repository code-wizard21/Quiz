const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { questionService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createQuestion = catchAsync(async (req, res) => {
    const question = await questionService.createQuestion(req.body);
    res.status(httpStatus.CREATED).send(question);
});

const getQuestion = catchAsync(async (req, res) => {
    const question = await questionService.getQuestionById(req.params.question_id);
    if (!question) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
    }
    res.json(success(httpStatus.OK, 'Question retrieved successfully', question));
});

const getQuestions = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['quiz', 'text', 'type']);

    const questions = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await questionService.queryQuestions(filter, questions);
    res.json(success(httpStatus.OK, 'Question retrieved successfully', result));
});

const updateQuestion = catchAsync(async (req, res) => {
    const question = await questionService.updateQuestionById(req.params.question_id, req.body);
    res.json(success(httpStatus.OK, 'Question updated successfully', question));
});

module.exports = {
    createQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
};
