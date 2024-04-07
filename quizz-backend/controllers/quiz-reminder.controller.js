const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const quizReminderService = require('../services/quiz-reminder.service');

const createQuizReminder = catchAsync(async (req, res) => {
    const quizReminder = await quizReminderService.createQuizReminder(req.body);
    res.json(success(httpStatus.CREATED, 'Created!', quizReminder));
});

const getQuizReminders = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['quiz', 'user', 'active']);
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await quizReminderService.queryQuizReminders(filter, options);
    res.json(success(httpStatus.OK, 'Fetched!', result));
});

const getQuizReminder = catchAsync(async (req, res) => {
    const quizReminder = await quizReminderService.getQuizReminderById(req.params.quiz_reminder_id);
    if (!quizReminder) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Quiz reminder not found');
    }
    res.json(success(httpStatus.OK, 'Fetched!', quizReminder));
});

const updateQuizReminder = catchAsync(async (req, res) => {
    const quizReminder = await quizReminderService.updateQuizReminderById(req.params.quiz_reminder_id, req.body);
    res.json(success(httpStatus.OK, 'Updated!', quizReminder));
});

module.exports = {
    createQuizReminder,
    getQuizReminders,
    getQuizReminder,
    updateQuizReminder,
};
