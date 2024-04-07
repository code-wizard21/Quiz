const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const quizReminderSchema = mongoose.Schema(
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
        date: {
            type: Date,
            required: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

// make sure a user can only have one reminder for a quiz
quizReminderSchema.index({ quiz: 1, user: 1 }, { unique: true });

// add plugin that converts mongoose to json
quizReminderSchema.plugin(toJSON);
quizReminderSchema.plugin(paginate);

/**
 * @typedef QuizReminder
 */

const QuizReminder = mongoose.model('QuizReminder', quizReminderSchema);

module.exports = QuizReminder;
