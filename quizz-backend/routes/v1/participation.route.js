const express = require('express');
const validate = require('../../middlewares/validate');
// const auth = require('../../middlewares/auth');
const participationValidation = require('../../validations/participation.validation');
const participationController = require('../../controllers/participation.controller');

const router = express.Router();

// TODO: Implement AUTH in participation API
router.post('/', validate(participationValidation.newParticipation), participationController.createParticipation);
router.get('/', validate(participationValidation.getParticipations), participationController.getParticipations);

router.get(
    '/:participation_id',
    validate(participationValidation.getParticipation),
    participationController.getParticipation
);
router.patch(
    '/:participation_id',
    validate(participationValidation.updateParticipation),
    participationController.updateParticipation
);

module.exports = router;
