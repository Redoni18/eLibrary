const mongoose = require('../database/db');
const Schema = mongoose.Schema;


const topicSchema = new Schema({
    topicName: {
        type: String,
        required: true
    },
    topicDescription: {
        type: String,
        required: true
    },


});


module.exports = mongoose.model('topic', topicSchema);