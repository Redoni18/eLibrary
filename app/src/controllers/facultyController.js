const Faculty = require('../models/Faculty');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_faculties = function (req, res) {
    Faculty.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_faculty = function (req, res) {


    let newFaculty = new Faculty({
        emri: req.body.emri,
        drejtimi: req.body.drejtimi
    });

    newFaculty.save();


    res.json({
        data: {
            emri: newFaculty.emri,
            drejtimi: newFaculty.drejtimi
        },
    });
}

exports.edit_faculty = function (req, res) {
    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedFaculty = {
        emri: req.body.emri,
        drejtimi: req.body.drejtimi
    }

    Faculty.findByIdAndUpdate(req.body._id, {$set: updatedFaculty}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating Faculty')
        }
    })
}

exports.delete_faculty = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Faculty.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_faculty = function (req, res) {
    let id = req.params.id;

    try {
        Faculty.findById({ _id: id }).exec(function (err, Faculty) {
            if (Faculty) {
                res.send(Faculty);
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