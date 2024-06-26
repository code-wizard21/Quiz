const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const catchAsync = require('../utils/catchAsync');
const { userService, agoraService, tokenService } = require('../services');
const { success } = require('../utils/ApiResponse');
const { User } = require('../models');
const GoogleUser = require('../models/google.user.model');
const UserActivity = require('../models/user-activity.model');
const shadowUser = require('../models/shadow-user.model');

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const googlelogin = async (req, res) => {
  const { credentialResponse,hostname } = req.body;
  console.log(hostname);

  if (!credentialResponse.authuser) {
    res.status(400).send({
      message: 'Code is not exist!',
    });
  }

  const response = await axios.post('https://oauth2.googleapis.com/token', {
    code: credentialResponse.code,
    client_id: '1082715081696-mgk2hen3l75jf0oin4lavv7ga0r4pf9a.apps.googleusercontent.com',
    client_secret: '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',
    redirect_uri: `https://${hostname}`,
    // redirect_uri: 'http://localhost:4002',
    grant_type: 'authorization_code',
    
  });

  console.log('response', response);
  const { access_token, id_token } = response.data;
  const token = `Bearer ${access_token}`;
  const { data: profile } = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  console.log('profile', profile);

  const { email, name } = profile;

  const password = 'testtest1';

  try {
    let user = await User.findOne({
      email,
    });

    if (!user) {
      const newUserDetails = {
        ticket: 10,
        credit: 20,
        amount: 0,
        email,
        name,
        username: name,
        role: 'user',
        isEmailVerified: profile.verified_email,
        avatar: profile.picture,
      };

      user = await userService.createUser(newUserDetails);

      const agoraUserData = await agoraService.generateChatUserinAgora(user, password);

      const userUpdateAgoraID = {
        agora: {
          uuid: agoraUserData.uuid,
          username: agoraUserData.username,
        },
      };

      user = await userService.updateUserById(user.id, userUpdateAgoraID);
    }

    const tokens = await tokenService.generateAuthTokens(user);
    const cookieOptions = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    return res.status(201).cookie('token', token, cookieOptions).json({
      user,
      tokens,
    });
  } catch (error) {
    console.error(`Error while creating user: ${error.message}`);
    return res.status(500).json({
      error: 'An error occurred while creating the user.',
    });
  }
};


const existUser = catchAsync(async (req, res) => {

  try {
    console.log('req.bodyexistUser',req.body);
    const {id}=req.body
    const result = await UserActivity.findOne({ user:id });
    console.log('userActivity_exist',result);
  

    res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while querying shadow users.' });
  }

});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const users = await User.paginate(filter, options);
  User.find({ role: 'user' })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(success(httpStatus.OK, 'Users retrieved successfully', result));
    })
    .catch((err) => {
      console.log(err);
    });

  // const result = await userService.queryUsers(filter, options);
});

const getHostUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const users = await User.paginate(filter, options);
  User.find({ role: 'host' })
    .sort({ createdAt: -1 })
    .then((result) => {
      res.json(success(httpStatus.OK, 'Users retrieved successfully', result));
    })
    .catch((err) => {
      console.log(err);
    });

  // const result = await userService.queryUsers(filter, options);
});
const getTicket = async (req, res) => {
  try {
    const result = await User.findById(req.body.id);

    res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while querying shadow users.' });
  }
};

const handleTip = async (req, res) => {
  const { id, rank, state } = req.body;
  console.log('req.body', req.body);
  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: `User not found with id: ${id}` });
    }

    if (rank < 4 && state == true) {
      await User.updateOne({ _id: user._id }, { amount: user.amount - 3 });
    }
    if (rank < 4 && state == false) {
      await User.updateOne({ _id: user._id }, { credit: user.credit - 10 });
    }

    if (rank > 3) {
      await User.updateOne({ _id: user._id }, { credit: user.credit - 10 });
    }

    const updatedUser = await User.findById(id);

    res.status(httpStatus.OK).json({
      status: 'success',
      message: 'User Tip successfully stored',
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);

    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'An error occurred while querying users.',
    });
  }
};

const findUser = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error(`Failed to find user with email: ${email}`);
  }
};

const updateUserAvatar = async (email, avatar) => {
  try {
    const updatedUser = await User.updateOne({ email }, { $set: { avatar } });
    return updatedUser;
  } catch (error) {
    throw new Error('Failed to update user avatar');
  }
};

const setAvatar = async (req, res) => {
  try {
    const { email, avatar } = req.body;

    // Find user
    let user = await findUser(email);

    // Check if user exists
    if (!user) return res.status(404).json({ message: 'User not found.' });

    // Update user avatar
    await updateUserAvatar(email, avatar);

    // Get updated user data
    user = await findUser(email);

    res.json(success(httpStatus.OK, 'Avatar updated successfully', user));
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const useTicketQuiz = async (req, res) => {
  try {
   
    let user = await User.findOne({ _id: req.body.id });
    await UserActivity.updateMany({}, { $inc: { pool: 1 } })
      .then((result) => {
        console.log('result');
      })
      .catch((err) => {
        console.log('Something went wrong when updating data!', err);
      });
    let docc = await UserActivity.updateOne(
      { user: req.body.id },
      {
        $set: {
          usedticket: true,
        },
      }
    );
    let updatedDoc = await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          ticket: user.ticket - 1, // Reduce the ticket count by 1
        },
      }
    );
    res.json(success(httpStatus.OK, 'Ticket reduced successfully', 'docc'));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the ticket count.' });
  }
};

const getShadowUsers = async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  try {
    const result = await userService.queryShadowUsers(filter, options);
    res.json(success(httpStatus.OK, 'Shadow users retrieved successfully', result));
  } catch (error) {
    console.error(error);
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
  googlelogin,
  createUser,
  getHostUsers,
  setAvatar,
  getTicket,
  getShadowUsers,
  getUsers,
  useTicketQuiz,
  handleTip,
  getUser,
  updateUser,
  deleteUser,
  existUser
};
