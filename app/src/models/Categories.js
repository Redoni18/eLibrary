const mongoose = require('../database/db')
const Schema = mongoose.Schema
const categories = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('categories', categories);