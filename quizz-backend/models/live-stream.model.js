const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const User = require('./user.model');

const liveStreamSchema = mongoose.Schema(
    {
        host: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            required: true,
            validate: {
                async validator(value) {
                    const user = await User.findById(value);
                    return user && user.role === 'host';
                },
                message: 'Host must be a user with role "host"',
            },
        },
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Quiz',
            required: true,
            unique: true,
        },
        start_time: {
            type: Date,
        },
        end_time: {
            type: Date,
        },
        room_id: {
            type: Number,
            unique: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'ongoing', 'completed', 'paused'],
            default: 'scheduled',
        },
        viewer_count: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
liveStreamSchema.plugin(toJSON);
liveStreamSchema.plugin(paginate);

// generate room_id = last room_id + 1 before saving if not provided
// TODO: check with Esmond
liveStreamSchema.pre('save', async function (next) {
    // make sure it is a new document
    if (this.isNew && !this.room_id) {
        const lastLiveStream = await LiveStream.findOne({}, {}, { sort: { room_id: -1 } });
        this.room_id = lastLiveStream ? lastLiveStream.room_id + 1 : 1;
    }
    next();
});

/**
 * @typedef LiveStream
 * @property {ObjectId} id
 * @property {ObjectId} host
 * @property {ObjectId} quiz
 * @property {Date} start_time
 * @property {Date} end_time
 * @property {Number} room_id
 */

const LiveStream = mongoose.model('LiveStream', liveStreamSchema);

module.exports = LiveStream;
