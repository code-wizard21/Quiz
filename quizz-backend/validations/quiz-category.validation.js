const Joi = require('joi');

const getCategories = {
    query: Joi.object().keys({
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
        sort_by: Joi.string(),
    }),
};
``;

module.exports = {
    getCategories,
};
