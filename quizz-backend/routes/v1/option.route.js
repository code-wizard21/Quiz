const express = require('express');
const validate = require('../../middlewares/validate');
const auth = require('../../middlewares/auth');
const optionValidation = require('../../validations/option.validation');
const optionController = require('../../controllers/option.controller');

const router = express.Router();

// TODO: Implement AUTH in option API
router.post('/', auth(), validate(optionValidation.newOption), optionController.createOption);
router.get('/', auth(), validate(optionValidation.getOptions), optionController.getOptions);

router.get('/:option_id', auth(), validate(optionValidation.getOption), optionController.getOption);
router.patch('/:option_id', auth(), validate(optionValidation.updateOption), optionController.updateOption);

module.exports = router;
