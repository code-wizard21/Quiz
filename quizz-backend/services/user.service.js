const httpStatus = require('http-status');
const { customAlphabet } = require('nanoid/async');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const ShadowUser = require('../models/shadow-user.model');
const nanoidNumeric = customAlphabet('0123456789', 9);
const nanoidAlpha = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 1);

const nanoidAlphaNumeric = () => nanoidAlpha() + nanoidNumeric();

function makeRandomUsername() {
  var result           = '';
  var length           = 6;
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Use the function


/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  // generate a random username if not provided
  const newUserBody = { ...userBody };

  // check if username is taken
  if (!newUserBody.username) {
    newUserBody.name = await makeRandomUsername();
    console.log(" newUserBody.username", newUserBody.name);
  }

  
  // check if email is taken
  if (await User.isEmailTaken(newUserBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  newUserBody.username = newUserBody.name;
  // create the user
  console.log("username#########",newUserBody);
  return User.create(newUserBody);
};

/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};
const queryShadowUsers = async (filter, options) => {
  console.log('###queryShadowUsersqueryShadowUsersqueryShadowUsers');
  const users = await ShadowUser.paginate(filter, options);
  return users;
};
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email });
};

const getUserByEmailAndRole = async (email, role) => {
  return User.findOne({ email, role });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.deleteOne();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  getUserByEmailAndRole,
  updateUserById,
  deleteUserById,
  queryShadowUsers
};
