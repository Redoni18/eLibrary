const UserType = require('../models/UserType');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_userTypes = function (req, res) {
    UserType.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_userType = function (req, res) {


    let newUserType = new UserType({
        userType: req.body.userType,
    });

    newUserType.save();


    res.json({
        data: {
            userType: newUserType.userType,
        },
    });
}

exports.edit_userType = function (req, res) {
    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedUserType = {
        userType: req.body.userType,
    }

    UserType.findByIdAndUpdate(req.body._id, {$set: updatedUserType}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating book')
        }
    })
}

exports.delete_userType = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    UserType.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_userType = function (req, res) {
    let id = req.params.id;

    try {
        UserType.findById({ _id: id }).exec(function (err, userType) {
            if (userType) {
                res.send(userType);
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