const mongoose = require('../database/db')
const Schema = mongoose.Schema
const reviewSchema = new Schema({
    reviewId: {
        type: String,
        default: `book-${Math.floor(Math.random * 30)}-${Math.floor(Math.random() * 40)}-${Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5)}`
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