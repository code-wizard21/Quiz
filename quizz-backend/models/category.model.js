const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const { quizCategories } = require('../config/enums');

const categorySchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            enum: quizCategories,
        },
        description: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        image: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        active: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

// add plugin that converts mongoose to json
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * @typedef Category
 * @property {ObjectId} id
 * @property {string} name
 * @property {string} description
 * @property {string} image
 * @property {boolean} active
 */

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
