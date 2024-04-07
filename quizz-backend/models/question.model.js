// define user participation schema using quiz model and user model
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { questionTypes } = require('../config/quiz');

const quizQuestionSchema = mongoose.Schema(
    {
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: [questionTypes.MULTIPLE_CHOICE, questionTypes.TRUE_OR_FALSE],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
quizQuestionSchema.plugin(toJSON);
quizQuestionSchema.plugin(paginate);

/**
 * @typedef QuizQuestion
 * @property {string} quiz
 * @property {string} question
 * @property {string} type
 * @property {string} createdAt
 * @property {string} updatedAt
 */
const QuizQuestion = mongoose.model('QuizQuestion', quizQuestionSchema);

module.exports = QuizQuestion;
