const express = require('express');
const validate = require('../../middlewares/validate');

const payController = require('../../controllers/pay.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();


// router.get('/:_id', payController.getTransactionID);
router.get('/:_id', payController.getID);

module.exports = router;
