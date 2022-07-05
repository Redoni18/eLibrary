const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const FacultySchema = new Schema({
    emri: {
        type: String,
        required: true
    },
    drejtimi: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Faculty', FacultySchema);