const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

const validateUsername = function (username) {
  /*
   * A valid username should start with an alphabet so, [a-z].
   * All other characters can be alphabets, numbers or an underscore so, [a-z0-9_].
   * length of username should be between 6 to 20 characters.
   */
  const usernameRegex = /^[A-Za-z][A-Za-z0-9_]{5,19}$/;
  return username && usernameRegex.test(username);
};

const userSchema = mongoose.Schema(
  {
    mobile: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      validate: [validateUsername, 'Please fill a valid username'],
    },
    device_token: {
      type: String,
      trim: true,
    },
    registered_user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    agora: {
      uuid: {
        type: String,
        trim: true,
      },
      username: {
        type: String,
        trim: true,
      },
    },
    role: {
      type: String,
      enum: ['shadow'],
      default: 'shadow',
    },
    registered_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
userSchema.plugin(toJSON);
userSchema.plugin(paginate);

/**
 * @typedef ShadowUser
 */
const ShadowUser = mongoose.model('ShadowUser', userSchema);

module.exports = ShadowUser;
