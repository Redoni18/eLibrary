const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    isoCountryCode: {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('country', countrySchema);