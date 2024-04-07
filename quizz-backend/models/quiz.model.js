const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { quizStatus } = require('../config/quiz');
const User = require('./user.model');

// TODO: Implement active or inactive status for quizes

const quizSchema = mongoose.Schema(
    {
        host: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                async validator(value) {
                    const user = await User.findById(value);
                    return user && user.role === 'host';
                },
                message: 'Host must be a user with role "host"',
            },
        },
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
            default: null,
        },
        // voting_category contains an array of categories
        voting_category: [
            {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Category',
            },
        ],
        status: {
            type: String,
            enum: [quizStatus.ACTIVE, quizStatus.INACTIVE, quizStatus.COMPLETED, quizStatus.CANCELLED, quizStatus.VOTING],
            default: quizStatus.INACTIVE,
        },
        start_date: {
            type: Date,
            required: true,
            validate(value) {
                if (value < Date.now()) {
                    throw new Error('Start date must be greater than current date');
                }
            },
        },
        is_paid: {
            type: Boolean,
            required: true,
            default: false,
        },
        description: {
            type: String,
            required: true,
            validate(value) {
                if (value.length < 10) {
                    throw new Error('Description must be at least 10 characters');
                }
            },
        },
        is_live: {
            type: Boolean,
            default: false,
        },
        image: {
            type: String,
            default: '',
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
quizSchema.plugin(toJSON);
quizSchema.plugin(paginate);

/**
 * @typedef Quiz
 * @property {ObjectId} id
 * @property {ObjectId} host
 * @property {String} category
 * @property {Date} start_date
 * @property {String} status
 * @property {Array} voting_category
 * @property {Boolean} is_paid
 * @property {Boolean} is_live
 * @property {String} image
 * @property {String} description
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */
const Quiz = mongoose.model('quizze', quizSchema);

module.exports = Quiz;
