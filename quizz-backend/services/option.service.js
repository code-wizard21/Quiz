const httpStatus = require('http-status');
const Option = require('../models/option.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} optionBody
 * @returns {Promise<Option>}
 */
const createOption = async (optionBody) => {
  return Option.create(optionBody);
};

/**
 * Get option by id
 * @param {ObjectId} optionId
 * @returns {Promise<Option>}
 */

const getOptionById = async (optionId) => {
  return Option.findById(optionId);
};

/**
 * Query for option
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.text] - Text of option
 * @param {string} [options.is_correct] - Is correct of option
 * @param {string} [options.question] - question options
 * @returns {Promise<QueryResult>}
 */

const queryOptions = async (filter, options) => {
  const option = await Option.paginate(filter, options);
  return option;
};

/**
 * Update option by id
 * @param {ObjectId} optionId
 * @param {Object} updateBody
 * @returns {Promise<Option>}
 */

const updateOptionById = async (optionId, updateBody) => {
  const option = await getOptionById(optionId);
  if (!option) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Option not found');
  }
  Object.assign(option, updateBody);
  await option.save();
  return option;
};

const getOptionWithCorrectAndTotalAnswers = async (questionId) => {
  const totalAnswers = await Option.aggregate([
    {
      $match: {
        question: new ObjectId(questionId),
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

  return totalAnswers;
};

module.exports = {
  createOption,
  getOptionById,
  queryOptions,
  updateOptionById,
  getOptionWithCorrectAndTotalAnswers,
};
