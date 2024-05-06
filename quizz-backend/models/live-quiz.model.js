const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const livequizSchema = mongoose.Schema(
  {
    status: {
      type: String,
    },
    question_index: {
      type: Number,
    },
    total_questions: {
      type: Number,
    },
    question_id: {
      type: String,
    },
    pool: {
      type: Number,
      default: 50,
    },
    contestants: {
      type: Number,
      default: 0,
    },

    viewer_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
livequizSchema.plugin(toJSON);
livequizSchema.plugin(paginate);

/**
 * @typedef LiveStream
 * @property {ObjectId} id
 * @property {ObjectId} host
 * @property {ObjectId} quiz
 * @property {Date} start_time
 * @property {Date} end_time
 * @property {Number} room_id
 */

const livequiz = mongoose.model('Livequiz', livequizSchema);

module.exports = livequiz;
