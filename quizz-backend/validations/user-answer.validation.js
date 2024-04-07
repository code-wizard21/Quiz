const Joi = require('joi');
const { objectId } = require('./custom.validation');

const newUserAnswer = {
    body: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        user: Joi.string().custom(objectId),
        question: Joi.string().custom(objectId),
        option: Joi.string().custom(objectId),
        duration: Joi.number().required(),
    }),
};

const getUserAnswer = {
    params: Joi.object().keys({
        option_id: Joi.string().custom(objectId),
    }),
};

const getUserAnswers = {
    query: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        user: Joi.string().custom(objectId),
        question: Joi.string().custom(objectId),
        option: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateUserAnswer = {
    params: Joi.object().keys({
        option_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            quiz: Joi.string().custom(objectId),
            user: Joi.string().custom(objectId),
            question: Joi.string().custom(objectId),
            option: Joi.string().custom(objectId),
            duration: Joi.number().required(),
        })
        .min(1),
};

module.exports = {
    newUserAnswer,
    getUserAnswer,
    getUserAnswers,
    updateUserAnswer,
};
