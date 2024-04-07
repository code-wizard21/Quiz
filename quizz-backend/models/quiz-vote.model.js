const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const quizVoteSchema = mongoose.Schema(
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
        category: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Category',
            required: true,
            validator(v) {
                return this.quiz.voting_category.includes(v);
            },
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
quizVoteSchema.plugin(toJSON);
quizVoteSchema.plugin(paginate);

// unique compound index for quiz and user
quizVoteSchema.index({ quiz: 1, user: 1 }, { unique: true });

/**
 * @typedef QuizVote
 * @property {ObjectId} id
 * @property {ObjectId} quiz
 * @property {ObjectId} user
 * @property {ObjectId} category
 */

const QuizVote = mongoose.model('QuizVote', quizVoteSchema);

module.exports = QuizVote;
