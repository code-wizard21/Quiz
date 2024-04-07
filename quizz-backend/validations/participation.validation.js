const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { deviceType, participationStatus } = require('../config/participation');

const newParticipation = {
    body: Joi.object().keys({
        quiz: Joi.string().custom(objectId).required(),
        user: Joi.string().custom(objectId).required(),
        status: Joi.string()
            .valid(participationStatus.PENDING, participationStatus.ONGOING, participationStatus.COMPLETED)
            .required(),
        deviceType: Joi.string().valid(deviceType.MOBILE, deviceType.DESKTOP).default(deviceType.MOBILE),
        score: Joi.number(),
        duration: Joi.number(),
        date: Joi.date().required(),
    }),
};

const getParticipation = {
    params: Joi.object().keys({
        participation_id: Joi.string().custom(objectId),
    }),
};

const getParticipations = {
    query: Joi.object().keys({
        quiz: Joi.string().custom(objectId),
        user: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

const updateParticipation = {
    params: Joi.object().keys({
        participation_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            quiz: Joi.string().custom(objectId),
            user: Joi.string().custom(objectId),
            status: Joi.string().valid(
                participationStatus.PENDING,
                participationStatus.ONGOING,
                participationStatus.COMPLETED
            ),
            deviceType: Joi.string().valid(deviceType.MOBILE, deviceType.DESKTOP),
            score: Joi.number(),
            duration: Joi.number(),
            date: Joi.date(),
        })
        .min(1),
};

module.exports = {
    newParticipation,
    getParticipation,
    getParticipations,
    updateParticipation,
};
