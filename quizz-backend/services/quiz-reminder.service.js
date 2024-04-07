const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { QuizReminder } = require('../models');

/**
 * Create a quizReminder
 * @param {Object} quizReminderBody
 * @returns {Promise<QuizReminder>}
 * @throws {ApiError}
 */

const createQuizReminder = async (quizReminderBody) => {
    const quizReminder = await QuizReminder.create(quizReminderBody);
    return quizReminder;
};

/**
 * Query for quizReminders
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} options.sortBy - Sort option in the format: sortField:(desc|asc). Default: createdAt:desc
 * @param {number} options.limit - Maximum number of quizReminders to return per page. Default: 10
 * @param {number} options.page - Current page of quizReminders
 * @returns {Promise<QueryResult>}
 * @throws {ApiError}
 */

const queryQuizReminders = async (filter, options) => {
    const quizReminders = await QuizReminder.paginate(filter, options);
    return quizReminders;
};

/**
 * Get quizReminder by id
 * @param {ObjectId} id
 * @returns {Promise<QuizReminder>}
 * @throws {ApiError}
 * */

const getQuizReminderById = async (id) => {
    const quiz = await QuizReminder.findById(id);
    if (!quiz) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Quiz reminder not found');
    }
    return quiz;
};

/**
 * Update quizReminder by id
 * @param {ObjectId} quizReminderId
 * @param {Object} updateBody
 * @returns {Promise<QuizReminder>}
 * @throws {ApiError}
 */

const updateQuizReminderById = async (quizReminderId, updateBody) => {
    const quizReminder = await getQuizReminderById(quizReminderId);
    Object.assign(quizReminder, updateBody);
    await quizReminder.save();
    return quizReminder;
};

module.exports = {
    createQuizReminder,
    queryQuizReminders,
    getQuizReminderById,
    updateQuizReminderById,
};
