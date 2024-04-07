const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const leaderboardSchema = mongoose.Schema(
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
        rank: {
            type: Number,
            required: true,
        },
        correct_answers: {
            type: Number,
            required: true,
        },
        total_duration: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
leaderboardSchema.plugin(toJSON);
leaderboardSchema.plugin(paginate);

// make quiz unique for each user
leaderboardSchema.index({ quiz: 1, user: 1 }, { unique: true });

/**
 * @typedef Leaderboard
 * @property {ObjectId} id
 * @property {ObjectId} quiz
 * @property {ObjectId} user
 * @property {Number} rank
 * @property {Number} correct_answers
 * @property {Number} total_duration
 */

/**
 * @typedef LeaderboardQuery
 */

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

module.exports = Leaderboard;
