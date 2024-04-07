const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const questionValidation = require('../../validations/question.validation');
const questionController = require('../../controllers/question.controller');

const router = express.Router();

// TODO: Implement AUTH in question API
router.post('/', auth(), validate(questionValidation.newQuestion), questionController.createQuestion);
router.get('/', auth(), validate(questionValidation.getQuestions), questionController.getQuestions);

router.get('/:question_id', auth(), validate(questionValidation.getQuestion), questionController.getQuestion);
router.patch('/:question_id', auth(), validate(questionValidation.updateQuestion), questionController.updateQuestion);

module.exports = router;
