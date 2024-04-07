const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const quizCategoriesValidation = require('../../validations/quiz-category.validation');
const optionController = require('../../controllers/quiz-category.controller');

const router = express.Router();

router.get('/', validate(quizCategoriesValidation), optionController.getOptions);

module.exports = router;
