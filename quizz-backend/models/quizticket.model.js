const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


const QuizTicketSchema = mongoose.Schema(
  {
    // host: {
    //   type: mongoose.SchemaTypes.ObjectId,
    //   required: true,
    // },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    quiz: {
      type: String,
      required: true,
    },
    // room_id: {
    //   type: Number,
    // },
    ticket: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
QuizTicketSchema.plugin(toJSON);
QuizTicketSchema.plugin(paginate);

/**
 * @typedef QuizTicketSchema
 * @property {ObjectId} id
 * @property {ObjectId} host
 * @property {ObjectId} quiz
 * @property {Number} ticket
 * @property {Date} created_time
 * @property {Number} room_id
 */

const quizticket = mongoose.model('quizticket', QuizTicketSchema);

module.exports = quizticket;
