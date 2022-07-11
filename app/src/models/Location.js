const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type : String,
        required : true
    },
    latitude:{
        type: Number,
        default: null
    },
    longitude:{
        type: Number,
        default: null
    }
});


module.exports = mongoose.model('location', locationSchema);