const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService, agoraService } = require('../services');
const { Token,UserAnswer ,UserActivity} = require('../models');
const { tokenTypes } = require('../config/tokens');

const register = catchAsync(async (req, res) => {
  let updatedUser;
  req.body.ticket = 10;
  req.body.credit = 20;
 
  if (req.body.shadow_user_id) {
    const shadowUser = await userService.getUserById(req.body.shadow_user_id);
    if (shadowUser) {
      delete req.body.shadow_user_id;
      const userUpdateBody = { ...req.body, role: 'user' };

      updatedUser = await userService.updateUserById(shadowUser.id, userUpdateBody);
     
      const shadowAnswer=await UserAnswer.findOne({user:req.body.shadow_user_id});
      if(shadowAnswer!=null){
        await U
        await UserAnswer.updateMany(
          { user: shadowID },
          { $set: { username: updatedUser.name, updatedUser: user._id } },
          { multi: true }
        );
      }
      // remove old user refresh token
    //   const refreshTokenDoc = await Token.findOne({
    //     token: req.body.refresh_token,
    //     type: tokenTypes.REFRESH,
    //     blacklisted: false,
    //   });
    //   await refreshTokenDoc.deleteOne();
    }
  } else {
    const user = await userService.createUser(req.body);
    let agoraUserData;
    try {
      agoraUserData = await agoraService.generateChatUserinAgora(user, req.body.password);
    } catch (err) {
      console.error('error occur', err);
      // Or even handle the	error and send a response back to the user if it's an API endpoint:
      // res.status(500).send({ error: 'Error while generating Agora user' });
      return;
    }

    const userUpdateID = {
      agora: {
        uuid: agoraUserData.uuid,
        username: agoraUserData.username,
      },
    };
    updatedUser = await userService.updateUserById(user.id, userUpdateID);
  }

  const tokens = await tokenService.generateAuthTokens(updatedUser);

  res.status(httpStatus.CREATED).send({ user: updatedUser, tokens });
});

const shadowRegister = catchAsync(async (req, res) => {
  req.body.role = 'shadow';
  // default password for shadow user is 'quizApp@123'
  req.body.password = 'quizApp@123';

  const user = await userService.createShadowUser(req.body);
  
 
  const agoraUserData = await agoraService.generateChatUserinAgora(user, req.body.password);

  const userUpdateID = {
    agora: {
      uuid: agoraUserData.uuid,
      username: agoraUserData.username,
    },
  };
 
  const updatedUser = await userService.updateUserById(user.id, userUpdateID);
 
  const tokens = await tokenService.generateAuthTokens(updatedUser);

  res.status(httpStatus.CREATED).send({ user: updatedUser, tokens });
});

const getShadowUser = catchAsync(async (req, res, next) => {
  const shadowUserID = req.cookies['shadow-user-id'];

  if (!shadowUserID) {
    return res.status(httpStatus.NOT_FOUND).send();
  }

  const user = await userService.getUserById(shadowUserID);

  if (!user) {
    return res.status(httpStatus.NOT_FOUND).send();
  }

  const tokens = await tokenService.generateAuthTokens(user);

  return res.send({ user, tokens });
});

const userLogin = catchAsync(async (req, res) => {
  const { email, password ,shadowID} = req.body;
 
  const shadowAnswer=await UserAnswer.findOne({user:shadowID});
 
  const user = await authService.loginUserWithEmailAndPassword(email, password, 'user');
;
  if(shadowAnswer!=null){
    const activityUser=await UserActivity.findOne({user:shadowID});

    await UserAnswer.updateMany(
      { user: shadowID },
      { $set: { username: user.name, user: user._id } },
      { multi: true }
    );
  }
  const tokens = await tokenService.generateAuthTokens(user);
  // TODO: Implement coin service
  const coin = {
    coin: 101,
    super_coin: 21,
  };
  res.send({ user, tokens, coin });
});

const hostLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userService.getUserByEmailAndRole(email, 'host');

    if (!user || !(await user.isPasswordMatch(password))) {
      return res.json(null);
    } else {
      const tokens = await tokenService.generateAuthTokens(user);

      return res.json({ user, tokens });
    }
  } catch (error) {
    console.log(error);
  }
};

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const user = await authService.loginUserWithEmailAndPassword(email, password, 'admin');
  const tokens = await tokenService.generateAuthTokens(user);

  res.json({ user, tokens });
});

const adminRegister = async (req, res) => {
  try {
    req.body.role = 'admin';

    const user = await userService.createUser(req.body);

    return res.status(200).send({
      id: user._id,
      role: user.role,
      message: 'Admin user  created successfully.',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).send({
      message: error.message || 'Some error occurred while creating the user.',
    });
  }
};

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refresh_token);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refresh_token);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.email);
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

const authenticatedUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user.id);
  // await userService.updateUserById(user.id, { lastLogin: Date.now() });
  return res.send(user);
});

module.exports = {
  register,
  userLogin,
  hostLogin,
  adminLogin,
  adminRegister,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  authenticatedUser,
  shadowRegister,
  getShadowUser,
};
