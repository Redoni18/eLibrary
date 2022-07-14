const Event = require('../models/Event');
var ObjectID = require('mongoose').Types.ObjectId;
const { body, validationResult } = require('express-validator/check')
var moment = require('moment')

exports.validate = (method) => {
    switch (method) {
      case 'post_event': {
       return [ 
        body('name').exists().isLength({min: 2, max: 20}),
        body('books').exists(),
        body('description').exists().isLength({min: 2, max: 150}),
        body('startDate').exists(),
        body('endDate').exists()
        ]   
      }
      case 'edit_event': {
        return [ 
        body('name').exists().isLength({min: 2, max: 20}),
        body('books').exists(),
        body('description').exists().isLength({min: 2, max: 150}),
        body('startDate').exists(),
        body('endDate').exists()
        ]   
         }
    }
  }

exports.get_events = function (req,res) {
    Event.find((err,docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};


exports.get_current_events = function (req,res) {
    var today = (moment().format('YYYY-MM-DD'))
    Event.find({
        endDate:{$gte:today},startDate:{$lte:today}
    }).exec((err,docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};
exports.get_future_events = function (req,res) {
    var today = (moment().add(1,'days').format('YYYY-MM-DD'))
    Event.find({
        startDate:{$gte:today}
    }).exec((err,docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};


exports.post_event = function (req,res) {

    const errors = validationResult(req)

    let newEvent = new Event ({
        name: req.body.name,
        description: req.body.description,
        books: req.body.books,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    });

    if(errors.isEmpty()){
        newEvent.save();
    }

    res.json({
        data: {
            name: newEvent.userType,
            description: newEvent.duration,
            books: newEvent.books,
            startDate: newEvent.startDate,
            endDate: newEvent.endDate
        },
    });
}

exports.edit_event = function (req, res) {

    const errors = validationResult(req)

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }
    if(!errors.isEmpty()){
        return res.status(500).send(`Invalid Data`)
    }

    let updatedEvent = {
        name: req.body.name,
        description: req.body.description,
        books: req.body.books,
        startDate: req.body.startDate,
        endDate: req.body.endDate
    }

    Event.findByIdAndUpdate(req.body._id, {$set: updatedEvent}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating event')
        }
    })
}

exports.delete_event = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Event.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_event = function (req, res) {
    let id = req.params.id;

    try {
        Event.findById({ _id: id }).exec(function (err, message) {
            if (message) {
                res.send(message);
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