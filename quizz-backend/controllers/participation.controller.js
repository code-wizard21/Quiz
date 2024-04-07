const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { participationService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createParticipation = catchAsync(async (req, res) => {
    const participation = await participationService.createParticipation(req.body);
    res.status(httpStatus.CREATED).send(participation);
});

const getParticipation = catchAsync(async (req, res) => {
    const participation = await participationService.getParticipationById(req.params.participation_id);
    if (!participation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Participation not found');
    }
    res.json(success(httpStatus.OK, 'Participation retrieved successfully', participation));
});

const getParticipations = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['quiz', 'user']);

    const participations = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await participationService.queryParticipations(filter, participations);
    res.json(success(httpStatus.OK, 'Participations retrieved successfully', result));
});

const updateParticipation = catchAsync(async (req, res) => {
    const participation = await participationService.updateParticipationById(req.params.participation_id, req.body);
    res.json(success(httpStatus.OK, 'Participation updated successfully', participation));
});

module.exports = {
    createParticipation,
    getParticipation,
    getParticipations,
    updateParticipation,
};
