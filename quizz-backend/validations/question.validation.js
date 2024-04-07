const Joi = require('joi');
const { objectId } = require('./custom.validation');

const newQuestion = {
    body: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        text: Joi.string().required(),
        type: Joi.string().required(),
    }),
};

const getQuestion = {
    params: Joi.object().keys({
        question_id: Joi.string().custom(objectId),
    }),
};

const getQuestions = {
    query: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        text: Joi.string(),
        is_correct: Joi.boolean(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateQuestion = {
    params: Joi.object().keys({
        question_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            quiz: Joi.string().custom(objectId),
            text: Joi.string(),
            type: Joi.string(),
        })
        .min(1),
};

module.exports = {
    newQuestion,
    getQuestion,
    getQuestions,
    updateQuestion,
};
