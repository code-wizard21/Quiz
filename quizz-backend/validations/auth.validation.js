const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    mobile: Joi.string(),
    device_token: Joi.string().allow(''),
    shadow_user_id: Joi.string().custom(objectId),
    refresh_token: Joi.string(),
  }),
};

const shadowRegister = {
  body: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().custom(password),
    name: Joi.string(),
    mobile: Joi.string(),
    device_token: Joi.string().allow(''),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refresh_token: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  shadowRegister,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
};
