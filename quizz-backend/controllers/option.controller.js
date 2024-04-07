const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { optionService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const createOption = catchAsync(async (req, res) => {
    const option = await optionService.createOption(req.body);
    res.status(httpStatus.CREATED).send(option);
});

const getOption = catchAsync(async (req, res) => {
    const option = await optionService.getOptionById(req.params.option_id);
    if (!option) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Option not found');
    }
    res.json(success(httpStatus.OK, 'Option retrieved successfully', option));
});

const getOptions = catchAsync(async (req, res) => {
    const filter = pick(req.query, ['text', 'is_correct', 'question']);

    const options = pick(req.query, ['sort_by', 'limit', 'page']);
    const result = await optionService.queryOptions(filter, options);
    res.json(success(httpStatus.OK, 'Optionzes retrieved successfully', result));
});

const updateOption = catchAsync(async (req, res) => {
    const option = await optionService.updateOptionById(req.params.option_id, req.body);
    res.json(success(httpStatus.OK, 'Option updated successfully', option));
});

module.exports = {
    createOption,
    getOption,
    getOptions,
    updateOption,
};
