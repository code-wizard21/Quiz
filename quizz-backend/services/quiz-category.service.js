const Category = require('../models/category.model');

/**
 * Query for option
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sort_by] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @param {string} [options.text] - Text of option
 * @param {string} [options.is_correct] - Is correct of option
 * @param {string} [options.question] - question options
 * @returns {Promise<QueryResult>}
 */

const queryQuizCategory = async (filter, options) => {
    const option = await Category.paginate(filter, options);
    return option;
};

module.exports = {
    queryQuizCategory,
};
