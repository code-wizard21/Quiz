const express = require('express');
const validate = require('../../middlewares/validate');
const authValidation = require('../../validations/auth.validation');
const authController = require('../../controllers/auth.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.get('/shadow/user', authController.getShadowUser);
router.post('/shadow/register', validate(authValidation.shadowRegister), authController.shadowRegister);

router.post('/register', validate(authValidation.register), authController.register);
router.post('/user/login', validate(authValidation.login), authController.userLogin);
router.post('/host/login', authController.hostLogin);
router.post('/admin/login', validate(authValidation.login), authController.adminLogin);
router.post('/admin/register', authController.adminRegister);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
router.post('/send-verification-email', authController.sendVerificationEmail);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.get('/me', auth(), authController.authenticatedUser);

module.exports = router;
