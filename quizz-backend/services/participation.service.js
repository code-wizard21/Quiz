const httpStatus = require('http-status');
const Participation = require('../models/participation.model');
const ApiError = require('../utils/ApiError');

/**
 * Create a user
 * @param {Object} participationBody
 * @returns {Promise<Participation>}
 */
const createParticipation = async (participationBody) => {
    return Participation.create(participationBody);
};

/**
 * Get participation by id
 * @param {ObjectId} participationId
 * @returns {Promise<Participation>}
 */

const getParticipationById = async (participationId) => {
    return Participation.findById(participationId);
};

/**
 * Query for participation
 * @param {Object} filter - Mongo filter
 * @param {Object} participations - Query participations
 * @param {string} [participations.sort_by] - Sort participation in the format: sortField:(desc|asc)
 * @param {number} [participations.limit] - Maximum number of results per page (default = 10)
 * @param {number} [participations.page] - Current page (default = 1)
 * @param {string} [participations.quiz] - Quiz Id
 * @param {string} [participations.user] - User Id
 * @returns {Promise<QueryResult>}
 */

const queryParticipations = async (filter, participations) => {
    const participation = await Participation.paginate(filter, participations);
    return participation;
};

/**
 * Update participation by id
 * @param {ObjectId} participationId
 * @param {Object} updateBody
 * @returns {Promise<Participation>}
 */

const updateParticipationById = async (participationId, updateBody) => {
    const participation = await getParticipationById(participationId);
    if (!participation) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Participation not found');
    }
    Object.assign(participation, updateBody);
    await participation.save();
    return participation;
};

module.exports = {
    createParticipation,
    getParticipationById,
    queryParticipations,
    updateParticipationById,
};
