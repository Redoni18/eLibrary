const Membership = require('../models/Membership');
var ObjectID = require('mongoose').Types.ObjectId;
const { body, validationResult } = require('express-validator/check')

exports.validate = (method) => {
    switch (method) {
      case 'post_membership': {
       return [ 
            body('userType').exists(),
            body('duration').exists().isLength({min: 2, max: 20}),
            body('price').exists().isNumeric(),
            body('description').exists().isLength({min:2,max:150})
            ]   
      }
      case 'edit_membership': {
        return [ 
            body('userType').exists(),
            body('duration').exists().isLength({min: 2, max: 20}),
            body('price').exists().isNumeric(),
            body('description').exists().isLength({min:2,max:150})
            ]   
         }
    }
  }

exports.get_memberships = function (req,res) {
    Membership.find((err,docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_membership = function (req,res) {

    const errors = validationResult(req)

    let newMembership = new Membership ({
        userType: req.body.userType,
        duration: req.body.duration,
        price: req.body.price,
        description: req.body.description,
    });

    if(errors.isEmpty()){
        newMembership.save();
    }

    res.json({
        data: {
            userType: newMembership.userType,
            duration: newMembership.duration,
            price: newMembership.price,
            description: newMembership.duration
        },
    });
}

exports.edit_membership = function (req, res) {

    const errors = validationResult(req)

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }
    if(!errors.isEmpty()){
        return res.status(500).send(`Invalid Data`)
    }

    let updatedMembership = {
        userType: req.body.userType,
        duration: req.body.duration,
        price: req.body.price,
        description: req.body.description
    }

    Membership.findByIdAndUpdate(req.body._id, {$set: updatedMembership}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating membership')
        }
    })
}

exports.delete_membership = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Membership.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_membership = function (req, res) {
    let id = req.params.id;

    try {
        Membership.findById({ _id: id }).exec(function (err, message) {
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