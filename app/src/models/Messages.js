const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const messagesSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'users' 
    },
    senderName: {
        type: String,
        required: true
    },
    messageBody: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('messages', messagesSchema);