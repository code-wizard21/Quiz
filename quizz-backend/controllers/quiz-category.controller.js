const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { quizCategoryService } = require('../services');
const pick = require('../utils/pick');
const { success } = require('../utils/ApiResponse');

const getOptions = catchAsync(async (req, res) => {
  const filter = pick(req.query, []);
  const options = pick(req.query, ['sort_by', 'limit', 'page']);
  const result = await quizCategoryService.queryQuizCategory(filter, options);
  res.json(success(httpStatus.OK, 'Category retrieved successfully', result));
});

module.exports = {
  getOptions,
};
