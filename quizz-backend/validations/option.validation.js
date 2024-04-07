const Joi = require('joi');
const { objectId } = require('./custom.validation');

const newOption = {
    body: Joi.object().keys({
        question: Joi.string().custom(objectId),
        text: Joi.string().required(),
        is_correct: Joi.boolean().required(),
    }),
};

const getOption = {
    params: Joi.object().keys({
        option_id: Joi.string().custom(objectId),
    }),
};

const getOptions = {
    query: Joi.object().keys({
        question: Joi.string().custom(objectId),
        text: Joi.string(),
        is_correct: Joi.boolean(),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateOption = {
    params: Joi.object().keys({
        option_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            question: Joi.string().custom(objectId),
            text: Joi.string(),
            is_correct: Joi.boolean(),
        })
        .min(1),
};

module.exports = {
    newOption,
    getOption,
    getOptions,
    updateOption,
};
