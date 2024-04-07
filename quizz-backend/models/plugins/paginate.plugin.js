/* eslint-disable no-param-reassign */

const paginate = (schema) => {
    /**
     * @typedef {Object} QueryResult
     * @property {Document[]} results - Results found
     * @property {number} page - Current page
     * @property {number} limit - Maximum number of results per page
     * @property {number} totalPages - Total number of pages
     * @property {number} totalResults - Total number of documents
     */
    /**
     * Query for documents with pagination
     * @param {Object} [filter] - Mongo filter
     * @param {Object} [options] - Query options
     * @param {string} [options.sort_by] - Sorting criteria using the format: sortField:(desc|asc). Multiple sorting criteria should be separated by commas (,)
     * @param {string} [options.populate] - Populate data fields.
     * @param {number} [options.limit] - Maximum number of results per page (default = 10)
     * @param {number} [options.page] - Current page (default = 1)
     * @returns {Promise<QueryResult>}
     */
    schema.statics.paginate = async function (filter, options) {
        let sort = '';
        if (options.sort_by) {
            const sortingCriteria = [];
            options.sort_by.split(',').forEach((sortOption) => {
                const [key, order] = sortOption.split(':');
                sortingCriteria.push((order === 'desc' ? '-' : '') + key);
            });
            sort = sortingCriteria.join(' ');
        } else {
            sort = 'createdAt';
        }

        let limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
        // make sure limit is not greater than 20
        limit = limit > 20 ? 20 : limit;
        const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
        const skip = (page - 1) * limit;

        const countPromise = this.countDocuments(filter).exec();
        let docsPromise = this.find(filter).sort(sort).skip(skip).limit(limit);

        if (options.populate) {
            docsPromise = docsPromise.populate(options.populate);
        }

        docsPromise = docsPromise.exec();

        return Promise.all([countPromise, docsPromise]).then((values) => {
            const [totalResults, results] = values;
            const totalPages = Math.ceil(totalResults / limit);
            const result = {
                results,
                page,
                limit,
                total_pages: totalPages,
                total_results: totalResults,
            };
            return Promise.resolve(result);
        });
    };
};

module.exports = paginate;
