const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');

// TODO: create new reminder schema for quiz whose reminder is set by the user

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
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error('Password must contain at least one letter and one number');
        }
      },
      private: true, // used by the toJSON plugin
    },
    mobile: {
      type: String,
      trim: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      // validate: [validateUsername, 'Please fill a valid username'],
    },
    device_token: {
      type: String,
      trim: true,
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
      enum: roles,
      default: 'user',
    },
    ticket: {
      type: Number,
      trim: true,
    },
    credit: {
      type: Number,
      trim: true,
    },
    device_token: {
      type: String,
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
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
 * Check if email is taken
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isEmailTaken = async function (email, excludeUserId) {
  // ignore if the email is empty
  if (!email) {
    return false;
  }
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if username is taken
 * @param {string} username - username
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
userSchema.statics.isUsernameTaken = async function (email, excludeUserId) {
  const user = await this.findOne({ email, _id: { $ne: excludeUserId } });
  return !!user;
};

/**
 * Check if password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

// presave to update updatedAt field on update
userSchema.pre('updateOne', function (next) {
  this.set({ updatedAt: new Date() });
  next();
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

/**
 * @typedef User
 */
const User = mongoose.model('User', userSchema);

module.exports = User;
