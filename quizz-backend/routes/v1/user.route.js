const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();
router.get('/shadow-users', userController.getShadowUsers);
router.post('/ticket/getall', userController.getTicket);
router.post('/ticket/useticketquiz', userController.useTicketQuiz);
router.post('/setavatar', userController.setAvatar);
router.post('/handletip', userController.handleTip);
router.post('/googlelogin', userController.googlelogin);

router
    .route('/')
    .post(auth('manageUsers'), validate(userValidation.createUser), userController.createUser)
    .get(auth('getUsers'), validate(userValidation.getUsers), userController.getUsers);


router
    .route('/:user_id')
    .get(auth('getUsers'), validate(userValidation.getUser), userController.getUser)
    .patch(auth('manageUsers'), validate(userValidation.updateUser), userController.updateUser)
    .delete(auth('manageUsers'), validate(userValidation.deleteUser), userController.deleteUser);


// router.post('/getshadow', auth(), validate(questionValidation.newQuestion), userController.getShadow);
// router.get('/getshadow', auth(), validate(userValidation.getUser), userController.getShadow);
router
    .route('/getshadow')
    .get(auth('getUsers'), validate(userValidation.getUser), userController.deleteUser)



module.exports = router;
