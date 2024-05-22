const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const userAnswerSchema = mongoose.Schema(
    {
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        state: {
			type: String,
			required: false,
		},
        answer: {
			type: String,
			required: false,
		},
        username: {
			type: String,
			required: true,
		},
        question_text: {
			type: String,
			required: false,
		},
        question: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Question',
            required: true,
        },
        option: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Option',
            required: false,
        },
        duration: {
            type: Number,
            required: false,
            validate(value) {
                if (value < 0) {
                    throw new Error('Duration must be a positive number');
                }
            },
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
userAnswerSchema.plugin(toJSON);
userAnswerSchema.plugin(paginate);

// add unique index for quiz + user + question + option
userAnswerSchema.index({ quiz: 1, user: 1, question: 1, option: 1 }, { unique: true });

/**
 * @typedef UserAnswer
 * @property {ObjectId} id
 * @property {ObjectId} quiz
 * @property {ObjectId} user
 * @property {ObjectId} question
 * @property {ObjectId} option
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const UserAnswer = mongoose.model('UserAnswer', userAnswerSchema);

module.exports = UserAnswer;
