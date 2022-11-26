const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
    languageName: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('language', languageSchema);