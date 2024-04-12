const express = require('express');
const validate = require('../../middlewares/validate');

const payController = require('../../controllers/pay.controller');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/buyticket', payController.buyticket);
 
 router.post('/create-checkout-session', payController.checkoutsession);


 router.get('/history', payController.gethistory);
router.get('/', payController.getAll);
router.get('/:_id', payController.getID);

module.exports = router;
