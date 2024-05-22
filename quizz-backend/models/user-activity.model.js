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
    },
    correct: {
      type: Number,
      required: false,
    },
    totalquestion: {
      type: Number,
      required: false,
    },
    time: {
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
