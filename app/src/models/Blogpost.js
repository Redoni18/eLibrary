const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const blogpostSchema = new Schema({
    title: {
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
    description: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('blogposts', blogpostSchema);