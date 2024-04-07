const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { agoraService } = require('../services');
const { success } = require('../utils/ApiResponse');

const generateRTCToken = catchAsync((req, res) => {
    const token = agoraService.generateRTCToken(req.params);
    res.json(success(httpStatus.OK, 'Generate RTC token successfully', token));
});

const generateRTMToken = catchAsync((req, res) => {
    const token = agoraService.generateRTMToken(req.params);
    res.send(success(httpStatus.OK, 'Generate RTM token successfully', token));
});

const generateRTEToken = catchAsync((req, res) => {
    const token = agoraService.generateRTEToken(req.params);

    res.send(success(httpStatus.OK, 'Generate RTE token successfully', token));
});

module.exports = {
    generateRTCToken,
    generateRTMToken,
    generateRTEToken,
};
