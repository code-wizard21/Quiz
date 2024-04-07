const Joi = require('joi');
const { objectId } = require('./custom.validation');

const newQuiz = {
  body: Joi.object()
    .keys({
      host: Joi.string().custom(objectId).required(),
      category: Joi.string().custom(objectId),
      start_date: Joi.date().required(),
      status: Joi.string(),
      voting_category: Joi.array().items(Joi.string().custom(objectId)),
      description: Joi.string().required(),
      is_paid: Joi.boolean(),
      is_live: Joi.boolean(),
      image: Joi.string(),
      questions: Joi.array(),
    })
    .xor('category', 'voting_category'),
};

const getQuiz = {
  params: Joi.object().keys({
    quiz_id: Joi.string().custom(objectId),
  }),
};

const getQuizesOverview = {
  params: Joi.object().keys({
    free: Joi.boolean(),
    paid: Joi.boolean(),
  }),
};

const getQuizes = {
  query: Joi.object().keys({
    host: Joi.string(),
    category: Joi.string().custom(objectId),
    sort_by: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    upcoming: Joi.boolean(),
    is_paid: Joi.boolean(),
    _id: Joi.string().custom(objectId),
  }),
};

const updateQuiz = {
  params: Joi.object().keys({
    quiz_id: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys({
    host: Joi.string(),
    category: Joi.string().custom(objectId),
    start_date: Joi.date(),
    status: Joi.string(),
    voting_category: Joi.array().items(Joi.string().custom(objectId)),
    description: Joi.string(),
    is_paid: Joi.boolean(),
    is_live: Joi.boolean(),
    image: Joi.string(),
    questions: Joi.array().items(
      Joi.object().keys({
        _id: Joi.string().custom(objectId),
        text: Joi.string(),
        options: Joi.array().items(
          Joi.object().keys({
            _id: Joi.string().custom(objectId),
            text: Joi.string(),
            is_correct: Joi.boolean(),
          })
        ),
      })
    ),
    removed_questions: Joi.array().items(Joi.string().custom(objectId)),
    removed_options: Joi.array().items(Joi.string().custom(objectId)),
  }),
};

const voteQuizCategory = {
  params: Joi.object().keys({
    quiz_id: Joi.required().custom(objectId),
    category_id: Joi.required().custom(objectId),
  }),
};

// const patchQuizLive = {
//     params: Joi.object().keys({
//         quiz_id: Joi.required().custom(objectId),
//     }),
//     body: Joi.object().keys({
//         status: Joi.string().required().valid('scheduled', 'ongoing', 'completed'),
//     }),
// };

const quizIdParams = {
  params: Joi.object().keys({
    quiz_id: Joi.string().custom(objectId),
  }),
};

const quizLeaderboard = {
  params: Joi.object().keys({
    quiz_id: Joi.string().custom(objectId).required(),
  }),
  query: Joi.object().keys({
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
    user_rank: Joi.boolean(),
  }),
};

module.exports = {
  newQuiz,
  getQuiz,
  getQuizes,
  updateQuiz,
  getQuizesOverview,
  voteQuizCategory,
  quizIdParams,
  quizLeaderboard,
};
