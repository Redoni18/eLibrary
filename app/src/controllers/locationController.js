const Location = require('../models/Location');
var ObjectID = require('mongoose').Types.ObjectId
const { body, validationResult } = require('express-validator/check')

exports.validate = (method) => {
    switch (method) {
      case 'post_location': {
       return [ 
            body('city').exists(),
            body('address').exists().isLength({min: 2, max: 50}),
            body('phoneNumber').exists().isInt().isLength({max: 20 }),
            body('latitude').exists(),
            body('longitude').exists()
         ]   
      }
      case 'edit_location': {
        return [ 
            body('city').exists(),
            body('address').exists().isLength({min: 2, max: 50}),
            body('phoneNumber').exists().isInt().isLength({max: 20 }),
            body('latitude').exists(),
            body('longitude').exists()
            ]   
         }
    }
  }

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

    const errors = validationResult(req)

    let newLocation = new Location({
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    });

    if(errors.isEmpty()){
        newLocation.save();
    }

    res.json({
        data: {
            city: newLocation.city,
            address: newLocation.address,
            phoneNumber: newLocation.phoneNumber,
            latitude: newLocation.latitude,
            longitude: newLocation.longitude
        }
    });
}

exports.edit_location = function (req,res) {

    const errors = validationResult(req)

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }
    if(!errors.isEmpty()){
        return res.status(500).send(`Invalid Data`)
    }
    let updatedLocation = {
        city: req.body.city,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber,
        latitude: req.body.latitude,
        longitude: req.body.longitude
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