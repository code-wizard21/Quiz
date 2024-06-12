const express = require('express');
const validate = require('../../middlewares/validate');
const agoraValidation = require('../../validations/agora.validation');
const agoraController = require('../../controllers/agora.controller');
const auth = require('../../middlewares/auth');
const { nocache } = require('../../middlewares/common');

const router = express.Router();

router.get(
    '/rtc/:channel/:role/:token_type/:uid',
    nocache,

    validate(agoraValidation.rtcToken),
    agoraController.generateRTCToken
);
router.get('/rtm/:uid', nocache, validate(agoraValidation.register), agoraController.generateRTMToken);
router.get(
    '/rte/:channel/:role/:token_type/:uid',
    nocache,

    validate(agoraValidation.rteToken),
    agoraController.generateRTEToken
);

module.exports = router;
