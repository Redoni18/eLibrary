const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userType: { 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'userTypeSchema' 
    },
    password: {
        type : String,
        required : true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isMember: {
        type: Boolean,
        default:false
    },
    bio:{
        type: String,
        required: false,
    },
    birthday: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: false,
    },
    social1: {
        type: String,
        required: false
    },
    social2: {
        type: String,
        required: false
    },
    social3: {
        type: String,
        required: false
    },
    createdAt: {
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type : Date,
        default : Date.now
    },
    books: [{ 
        type: mongoose.Schema.Types.Mixed, 
        ref: 'bookSchema' 
    }]

});


module.exports = mongoose.model('users', schema);