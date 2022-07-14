const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const staffSchema = new Schema({
    staffName: {
        type: String,
        required: true
    },
    staffEmail: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },

});


module.exports = mongoose.model('staff', staffSchema);