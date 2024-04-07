const Joi = require('joi');
const { objectId } = require('./custom.validation');

const createQuizReminder = {
    body: Joi.object().keys({
        quiz: Joi.string().custom(objectId).required(),
        user: Joi.string().custom(objectId).required(),
        date: Joi.date().required(),
        active: Joi.boolean(),
        status: Joi.string(),
    }),
};

const getQuizReminders = {
    query: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        user: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const getQuizReminder = {
    params: Joi.object().keys({
        quiz_reminder_id: Joi.string().custom(objectId),
    }),
};

const updateQuizReminder = {
    params: Joi.object().keys({
        quiz_reminder_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            quiz: Joi.string().custom(objectId),
            user: Joi.string().custom(objectId),
            date: Joi.date(),
            active: Joi.boolean(),
            status: Joi.string(),
        })
        .min(1),
};

module.exports = {
    createQuizReminder,
    getQuizReminders,
    getQuizReminder,
    updateQuizReminder,
};
