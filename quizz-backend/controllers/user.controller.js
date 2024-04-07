const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { success } = require('../utils/ApiResponse');

const createUser = catchAsync(async (req, res) => {
    const user = await userService.createUser(req.body);
    res.status(httpStatus.CREATED).send(user);
});

const getUsers = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['name', 'role']);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await userService.queryUsers(filter, options);
    res.json(success(httpStatus.OK, 'Users retrieved successfully', result));
});

const getShadowUsers = (async (req, res) => {
    const filter = pick(req.query, []);
    const options = pick(req.query, ['sort_by', 'limit', 'page']);
   console.log('#########getShadowUsersgetShadowUsers');
    try {
        const result = await userService.queryShadowUsers(filter, options);
        console.log('result',result)
        res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
        // Handle result here, such as send response or further processing
      } catch (error) {
        // Log error details, for debugging
        console.error(error);
      
        // If you are inside a request handler, send a response here
        res.status(500).json({ message: 'An error occurred while querying shadow users.' });
      }
    
  });


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
   console.log('req############',req.body);
});

module.exports = {
    createUser,
    getShadowUsers,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
};
