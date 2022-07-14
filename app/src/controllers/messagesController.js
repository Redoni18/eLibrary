const Messages = require('../models/Messages');
var ObjectID = require('mongoose').Types.ObjectId
const { body, validationResult } = require('express-validator/check')

//validation method
exports.validate = (method) => {
  switch (method) {
    case 'post_messages': {
     return [ 
            body('messageBody').exists().isLength({ min: 2, max: 500 }),
       ]   
    }
  }
}

exports.get_messages = function (req, res) {
    Messages.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_messages = function (req, res) {

    var today = new Date();
 
    var now = today.toLocaleDateString('en-us');
    console.log(now);

    const errors = validationResult(req)

    let newMessage = new Messages({
        messageBody: req.body.messageBody,
        user: req.body.user.id,
        senderName: req.body.user.name,
        date: now
    });

    if(errors.isEmpty()){
        newMessage.save();
    }



    res.json({
        data: {
            messageBody: newMessage.messageBody,
            user: newMessage.user,
            date: newMessage.date
        },
    });
}

// exports.edit_book = function (req, res) {
//     if(!ObjectID.isValid(req.body._id)){
//         return res.status(400).send(`No record with given id:   ${req.body._id}`)
//     }

//     let updatedBook = {
//         title: req.body.title,
//         author: req.body.author,
//         description: req.body.description,
//         year: req.body.year,
//         image: req.body.image
//     }

//     Book.findByIdAndUpdate(req.body._id, {$set: updatedBook}, {new: true}, (err, doc) => {
//         if(!err){
//             res.send(doc)
//         }else{
//             console.log('Error while updating book')
//         }
//     })
// }

exports.delete_message = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Messages.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_message = function (req, res) {
    let id = req.params.id;

    try {
        Messages.findById({ _id: id }).exec(function (err, message) {
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
};