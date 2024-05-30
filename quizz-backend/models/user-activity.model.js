// define user participation schema using quiz model and user model
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { number } = require('joi');

const userActivitySchema = mongoose.Schema(
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
    rewardCredit: {
      type: Number,
      default: 0,
      required: false,
    },
    rewardAmount: {
      type: Number,
      required: false,
      default: 0,
    },
    username: {
      type: String,
      required: false,
    },
    avatar: {
      type: String,
      required: false,
    },
    usedticket: {
      type: Boolean,
      required: false,
      default: false,
    },
    allQuestionCorrect: {
      type: Boolean,
      required: false,
      default: false,
    },
    correct: {
      type: Number,
      required: false,
      default: false,
    },
    totalquestion: {
      type: Number,
      required: false,
    },
    pool: {
      type: Number,
      required: false,
      default: 50,
    },
    time: {
      type: Number,
      required: false,
    },
    rank: {
      type: Number,
      required: false,
    },
    
    role: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userActivitySchema.plugin(toJSON);
userActivitySchema.plugin(paginate);

/**
 * @typedef UserParticipation
 */
const UserActivity = mongoose.model('UserActivity', userActivitySchema);

module.exports = UserActivity;
