const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    imageUrl: {
        type: String,
        required: true
    },
    isbn: {
        type: Number,
        required: true
    },
    categories: [{ 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'categories' 
    }]
});


module.exports = mongoose.model('books', bookSchema);