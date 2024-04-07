const Joi = require('joi');

const rtcToken = {
    params: Joi.object().keys({
        channel: Joi.string().required(),
        role: Joi.string().required().valid('publisher', 'audience'),
        token_type: Joi.string().required().valid('user_account', 'uid'),
        uid: Joi.string().required(),
    }),
};

const generateRTMToken = {
    params: Joi.object().keys({
        uid: Joi.string().required(),
    }),
};

const rteToken = {
    params: Joi.object().keys({
        channel: Joi.string().required(),
        role: Joi.string().required().valid('publisher', 'audience'),
        token_type: Joi.string().required().valid('user_account', 'uid'),
        uid: Joi.string().required(),
    }),
};

module.exports = {
    rtcToken,
    generateRTMToken,
    rteToken,
};
