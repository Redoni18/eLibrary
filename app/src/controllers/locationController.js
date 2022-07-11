const Location = require('../models/Location');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_locations = function (req,res) {
    Location.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
}

exports.post_location = function (req,res) {

    let newLocation = new Location({
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    });

    newLocation.save();

    res.json({
        data: {
            city: newLocation.city,
            address: newLocation.address,
            phoneNumber: newLocation.phoneNumber
        }
    });
}

exports.edit_location = function (req,res) {
    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedLocation = {
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    }

    Location.findByIdAndUpdate(req.body._id, {$set: updatedLocation}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating location')
        }
    })
}

exports.delete_location = function (req,res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Location.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_location = function (req,res) {
    let id = req.params.id;

    try {
        Location.findById({ _id: id }).exec(function (err, location) {
            if (location) {
                res.send(location);
            } 
        });
      } catch (error) {
        if ([400, 403, 404].includes(error.code)) {
          return res.status(error.code).send(error.message);
        }
    
        console.error(error);
        return res.status(500).send(error.message);
      }
}