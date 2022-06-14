const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('location', locationSchema);