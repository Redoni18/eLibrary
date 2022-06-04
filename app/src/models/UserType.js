const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const userTypeSchema = new Schema({
    userType: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('userType', userTypeSchema);