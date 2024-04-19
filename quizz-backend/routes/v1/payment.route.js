const express = require('express');
const validate = require('../../middlewares/validate');

const payController = require('../../controllers/pay.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();
 
 router.post('/create-checkout-ticket', payController.buyticket);
 router.post('/create-checkout-credit', payController.buyCredit);


 router.get('/history', payController.gethistory);
router.get('/', payController.getAll);
router.get('/:_id', payController.getID);
router.get('/transactions/:_id', payController.getTransactionID);
module.exports = router;
