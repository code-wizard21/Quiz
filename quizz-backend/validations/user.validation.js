const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
    body: Joi.object().keys({
        email: Joi.string().required().email(),
        password: Joi.string().required().custom(password),
        name: Joi.string().required(),
        role: Joi.string().required().valid('user', 'admin'),
        mobile: Joi.string().required(),
        device_token: Joi.string().allow(''),
    }),
};

const getUsers = {
    query: Joi.object().keys({
        name: Joi.string(),
        role: Joi.string(),
        sort_by: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        filters: Joi.string(),
        query: Joi.string(),
        sort: Joi.string(),
    }),
};

const getUser = {
    params: Joi.object().keys({
        user_id: Joi.string().custom(objectId),
    }),
};

const updateUser = {
    params: Joi.object().keys({
        user_id: Joi.required().custom(objectId),
    }),
    body: Joi.object()
        .keys({
            email: Joi.string().email(),
            password: Joi.string().custom(password),
            name: Joi.string(),
        })
        .min(1),
};

const deleteUser = {
    params: Joi.object().keys({
        user_id: Joi.string().custom(objectId),
    }),
};

module.exports = {
    createUser,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
