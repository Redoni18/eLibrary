const Upcoming = require('../models/Upcoming');
var ObjectID = require('mongoose').Types.ObjectId;




exports.get_upcomings = function (req, res) {
    Upcoming.find().exec(function (err, upcoming) {
        if (err) return handleError(err);

        res.json(upcoming);
    });
};

exports.get_upcoming = function (req, res) {
    let id = req.params.id;

    try {
        Upcoming.findById({ _id: id }).exec(function (err, upcoming) {
            if (upcoming) {
                res.send(upcoming);
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




exports.add_upcoming = function (req, res) {
    const newUpcoming = new Upcoming({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date
    });
    newUpcoming.save();
};

exports.delete_upcoming = function (req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Upcoming.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
};

exports.edit_upcoming = function (req, res) {
    if (!ObjectID.isValid(req.body.id)) {
        return res.status(400).send(`No record with given id:   ${req.body.id}`)
    }
    const updatedUpcoming = {
        _id: req.body.id,
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
    }

    Upcoming.findByIdAndUpdate(req.body.id, { $set: updatedUpcoming }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating Upcoming book')
        }
    })
};


