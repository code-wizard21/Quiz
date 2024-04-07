const httpStatus = require('http-status');
const { ObjectId } = require('mongodb');
const Question = require('../models/question.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} questionBody
 * @returns {Promise<Question>}
 */
const createQuestion = async (questionBody) => {
  return Question.create(questionBody);
};

/**
 * Get question by id
 * @param {ObjectId} questionId
 * @returns {Promise<Question>}
 */

const getQuestionById = async (questionId) => {
  const question = await Question.aggregate([
    {
      $match: {
        _id: new ObjectId(questionId),
      },
    },
    {
      $project: {
        _id: 1,
        quiz: 1,
        text: 1,
        type: 1,
      },
    },
  ]);

  // return only question
  return question.length > 0 ? question[0] : null;
};

/**
 * Query for question
 * @param {Object} filter - Mongo filter
 * @param {Object} questions - Query questions
 * @param {string} [questions.sort_by] - Sort question in the format: sortField:(desc|asc)
 * @param {number} [questions.limit] - Maximum number of results per page (default = 10)
 * @param {number} [questions.page] - Current page (default = 1)
 * @param {ObjectId} [questions.quiz] - Quiz id
 * @param {string} [questions.text] - question text
 * @param {string} [questions.type] - question type
 * @returns {Promise<QueryResult>}
 */

const queryQuestions = async (filter, questions) => {
  const question = await Question.paginate(filter, questions);
  return question;
};

/**
 * Update question by id
 * @param {ObjectId} questionId
 * @param {Object} updateBody
 * @returns {Promise<Question>}
 */

const updateQuestionById = async (questionId, updateBody) => {
  const question = await getQuestionById(questionId);
  if (!question) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Question not found');
  }
  Object.assign(question, updateBody);
  await question.save();
  return question;
};

const getQuestionWithOption = async (questionId, fetchIsCorrect = false) => {
  const projection = {
    _id: 1,
    text: 1,
    type: 1,
    options: {
      _id: 1,
      text: 1,
    },
  };

  if (fetchIsCorrect) {
    projection.options.is_correct = 1;
  }

  const ques = await Question.aggregate([
    {
      $match: {
        _id: new ObjectId(questionId),
      },
    },
    {
      $lookup: {
        from: 'options',
        localField: '_id',
        foreignField: 'question',
        as: 'options',
      },
    },
    {
      $project: projection,
    },
  ]);
  return ques.length > 0 ? ques[0] : null;
};

const getQuestionWithOptionAndTotalAnswers = async (questionId) => {
  const data = await Question.aggregate([
    {
      $match: {
        _id: new ObjectId(questionId),
      },
    },
    {
      $lookup: {
        from: 'options',
        let: {
          question_id: '$_id',
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ['$question', '$$question_id'],
              },
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
        ],
        as: 'options',
      },
    },
    {
      $project: {
        _id: 1,
        text: 1,
        type: 1,
        options: 1,
      },
    },
  ]);
  return data?.length > 0 ? data[0] : null;
};

module.exports = {
  createQuestion,
  getQuestionById,
  queryQuestions,
  updateQuestionById,
  getQuestionWithOption,
  getQuestionWithOptionAndTotalAnswers,
};
