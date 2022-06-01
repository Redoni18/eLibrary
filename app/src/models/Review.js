const mongoose = require('../database/db')
const Schema = mongoose.Schema
const { uuid } = require('uuidv4');
const reviewSchema = new Schema({
    reviewId: {
        type: String,
        default: uuid()
    },
    bookId: {
        type: String,
        required: true
    },
    book: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('review', reviewSchema);