const mongoose = require('../database/db');
const Schema = mongoose.Schema;

const membershipSchema = new Schema({
    userType: { 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'userTypes' 
    },
    duration: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isPremium: {
        type: Boolean,
        required:true
    }
});

module.exports = mongoose.model('memberships',membershipSchema);