// define user participation schema using quiz model and user model
const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { deviceType, participationStatus } = require('../config/participation');

const userParticipationSchema = mongoose.Schema(
    {
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Quiz',
            required: true,
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
        },
        // implement this everywhere
        user_type: {
            type: String,
            enum: ['shadow', 'registered'],
            required: true,
        },
        status: {
            type: String,
            enum: [participationStatus.PENDING, participationStatus.ONGOING, participationStatus.COMPLETED],
            required: true,
        },
        deviceType: {
            type: String,
            enum: [deviceType.MOBILE, deviceType.DESKTOP],
            default: deviceType.MOBILE,
        },
        score: {
            type: Number,
        },
        duration: {
            type: Number,
        },
        date: {
            type: Date,
            default: Date.now,
        },
        socketId: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// unique quiz and user index
userParticipationSchema.index({ quiz: 1, user: 1 }, { unique: true });

// add plugin that converts mongoose to json
userParticipationSchema.plugin(toJSON);
userParticipationSchema.plugin(paginate);

/**
 * @typedef UserParticipation
 */
const UserParticipation = mongoose.model('UserParticipation', userParticipationSchema);

module.exports = UserParticipation;
