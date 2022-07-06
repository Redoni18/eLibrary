const Country = require('../models/Country');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_countries = function (req,res) {
    Country.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
}

exports.post_country = function (req,res) {

    let newCountry = new Country({
        name: req.body.name,
        isoCountryCode: req.body.isoCountryCode
    });

    newCountry.save();

    res.json({
        data: {
            name: newCountry.name,
            isoCountryCode: newCountry.isoCountryCode
        }
    });
}

exports.edit_country = function (req,res) {
    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedCountry = {
        name: req.body.name,
        isoCountryCode: req.body.isoCountryCode
    }

    Country.findByIdAndUpdate(req.body._id, {$set: updatedCountry}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating country')
        }
    })
}

exports.delete_country = function (req,res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Country.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_country = function (req,res) {
    let id = req.params.id;

    try {
        Country.findById({ _id: id }).exec(function (err, country) {
            if (country) {
                res.send(country);
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