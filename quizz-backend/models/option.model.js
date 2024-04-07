const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const optionSchema = mongoose.Schema(
    {
        question: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Question',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        is_correct: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
optionSchema.plugin(toJSON);
optionSchema.plugin(paginate);

/**
 * @typedef Option
 * @property {string} question
 * @property {string} text
 * @property {boolean} is_correct
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const Option = mongoose.model('Option', optionSchema);

module.exports = Option;
