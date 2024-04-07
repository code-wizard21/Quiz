const httpStatus = require('http-status');
const UserAnswer = require('../models/user-answer.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} userAnswerBody
 * @returns {Promise<UserAnswer>}
 */
const createUserAnswer = async (userAnswerBody) => {
    return UserAnswer.create(userAnswerBody);
};

/**
 * Get userAnswer by id
 * @param {ObjectId} userAnswerId
 * @returns {Promise<UserAnswer>}
 */

const getUserAnswerById = async (userAnswerId) => {
    return UserAnswer.findById(userAnswerId);
};

/**
 * Query for userAnswer
 * @param {Object} filter - Mongo filter
 * @param {Object} userAnswer - Query userAnswer
 * @param {string} [userAnswer.sort_by] - Sort userAnswer in the format: sortField:(desc|asc)
 * @param {number} [userAnswer.limit] - Maximum number of results per page (default = 10)
 * @param {number} [userAnswer.page] - Current page (default = 1)
 * @param {ObjectId} [userAnswer.quiz] - quiz id
 * @param {ObjectId} [userAnswer.user] - user id
 * @param {ObjectId} [userAnswer.question] - question id
 * @param {ObjectId} [userAnswer.option] - option id
 * @param {ObjectId} [userAnswer.duration] - duration
 * @returns {Promise<QueryResult>}
 */

const queryUserAnswers = async (filter, userAnswer) => {
    const res = await UserAnswer.paginate(filter, userAnswer);
    return res;
};

/**
 * Update userAnswer by id
 * @param {ObjectId} userAnswerId
 * @param {Object} updateBody
 * @returns {Promise<UserAnswer>}
 */

const updateUserAnswerById = async (userAnswerId, updateBody) => {
    const userAnswer = await getUserAnswerById(userAnswerId);
    if (!userAnswer) {
        throw new ApiError(httpStatus.NOT_FOUND, 'UserAnswer not found');
    }
    Object.assign(userAnswer, updateBody);
    await userAnswer.save();
    return userAnswer;
};

module.exports = {
    createUserAnswer,
    getUserAnswerById,
    queryUserAnswers,
    updateUserAnswerById,
};
