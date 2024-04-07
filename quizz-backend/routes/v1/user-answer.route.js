const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const answerValidation = require('../../validations/user-answer.validation');
const answerController = require('../../controllers/user-answer.controller');

const router = express.Router();

// TODO: Implement AUTH in answer API
router.post('/', auth(), validate(answerValidation.newUserAnswer), answerController.createUserAnswer);
router.get('/', auth(), validate(answerValidation.getUserAnswers), answerController.getUserAnswers);

router.get('/:option_id', auth(), validate(answerValidation.getUserAnswer), answerController.getUserAnswer);
router.patch('/:option_id', auth(), validate(answerValidation.updateUserAnswer), answerController.updateUserAnswer);

module.exports = router;
