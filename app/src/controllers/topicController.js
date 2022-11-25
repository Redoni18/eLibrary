const Topic = require('../models/Topic');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_topics = function(req, res) {
    Topic.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while retrieving data')
        }
    })
};

exports.post_topic = function(req, res) {

    console.log(req.body)

    let newTopic = new Topic({
        topicName: req.body.topicName,
        topicDescription: req.body.topicDescription,
    });

    newTopic.save();

    res.json({
        data: {
            topicName: newTopic.topicName,
            topicDescription: newTopic.topicDescription,
        },
    });
}


exports.edit_topic = function(req, res) {
    if (!ObjectID.isValid(req.body._id)) {
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedTopic = {
        topicName: req.body.topicName,
        topicDescription: req.body.topicDescription
    }

    Topic.findByIdAndUpdate(req.body._id, { $set: updatedTopic }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating topic')
        }
    })
}

exports.delete_topic = function(req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Topic.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
}

exports.get_topic = function(req, res) {
    let id = req.params.id;

    try {
        Topic.findById({ _id: id }).exec(function(err, topic) {
            if (topic) {
                res.send(topic);
            }
        });
    } catch (error) {
        if ([400, 403, 404].includes(error.code)) {
            return res.status(error.code).send(error.message);
        }

        console.error(error);
        return res.status(500).send(error.message);
    }
};