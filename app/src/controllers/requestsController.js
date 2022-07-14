const Requests = require('../models/Requests');
var ObjectID = require('mongoose').Types.ObjectId;
const { body, validationResult } = require('express-validator/check')

exports.validate = (method) => {
    switch (method) {
      case 'add_request': {
       return [ 
              body('title').exists().isLength({ min: 2, max: 100 }),
              body('author').exists().isLength({min: 2, max: 100}),
              body('date').exists().isLength({min: 2, max: 100}),
              body('user').exists().isLength({min: 2, max: 1000}),
         ]   
      }
      case 'edit_request': {
          return [ 
              body('title').exists().isLength({ min: 2, max: 100 }),
              body('author').exists().isLength({ min: 2, max: 1000 }),
              body('date').exists().isLength({min: 2, max: 100}),
            ]   
         }
    }
  }

exports.get_requests = function (req, res) {
    Requests.find().exec(function (err, requests) {
        if (err) return handleError(err);

        res.json(requests);
    });
};

exports.get_request = function (req, res) {
    let id = req.params.id;

    try {
        Requests.findById({ _id: id }).exec(function (err, request) {
            if (request) {
                res.send(request);
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




exports.add_request = function (req, res) {
    const errors = validationResult(req)
    const newRequest = new Requests({
        title: req.body.title,
        author: req.body.author,
        date: req.body.date,
        user: req.body.user
    });
    if (errors.isEmpty()) {
        newRequest.save();   
    }
};

exports.delete_request = function (req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Requests.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
};

exports.edit_request = function (req, res) {
    const errors = validationResult(req)
    if (!ObjectID.isValid(req.body.id)) {
        return res.status(400).send(`No record with given id:   ${req.body.id}`)
    }
    const updatedRequest = {
        _id: req.body.id,
        title: req.body.bookId,
        author: req.body.author,
        date: req.body.date,
    }
    if (!errors.isEmpty()) {
        res.status(500).send('Invalid Edit of Request')
    }
    Requests.findByIdAndUpdate(req.body.id, { $set: updatedRequest }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating Request')
        }
    })
};


