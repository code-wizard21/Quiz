const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { success } = require('../utils/ApiResponse');
const { User } = require('../models');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const users = await User.paginate(filter, options);
  User.find({ role: 'user' }).sort({ createdAt: -1 })
    .then((result) => {
      res.json(success(httpStatus.OK, 'Users retrieved successfully', result));
    })
    .catch((err) => {
      console.log(err);
    });

  // const result = await userService.queryUsers(filter, options);
});

const getTicket = async (req, res) => {
  console.log('req.body', req.body);
  try {
    const result = await User.findById(req.body.id);
    console.log('result',result)
    res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while querying shadow users.' });
  }
};
const reduceTicket = async (req, res) => {
  console.log('req.body', req.body);
  try {
    let user = await User.findOne({ _id: req.body.id }); // First find the user to get the current ticket count
    let updatedDoc = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          ticket: user.ticket - 1, // Reduce the ticket count by 1
        },
      }
    );
    res.json(success(httpStatus.OK, 'Ticket reduced successfully', updatedDoc));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the ticket count.' });
  }
};

const getShadowUsers = async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  console.log('#########getShadowUsersgetShadowUsers');
  try {
    const result = await userService.queryShadowUsers(filter, options);
    res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
    // Handle result here, such as send response or further processing
  } catch (error) {
    // Log error details, for debugging
    console.error(error);

    // If you are inside a request handler, send a response here
    res.status(500).json({ message: 'An error occurred while querying shadow users.' });
  }
};

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.user_id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.user_id, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  console.log('req############', req.body);
});

module.exports = {
  createUser,
  getTicket,
  getShadowUsers,
  getUsers,
  reduceTicket,
  getUser,
  updateUser,
  deleteUser,
};
