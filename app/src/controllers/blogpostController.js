const Blogpost = require('../models/Blogpost');
var ObjectID = require('mongoose').Types.ObjectId
const { body, validationResult } = require('express-validator/check')

//validation method
exports.validate = (method) => {
  switch (method) {
    case 'post_blogpost': {
     return [ 
            body('title').exists().isLength({ min: 2, max: 100 }),
	    body('image').optional(),
            body('imageUrl').exists().isURL(),
            body('description').exists().isLength({min: 2, max: 1000}),
            
       ]   
    }
    case 'edit_blogpost': {
        return [ 
               body('title').exists().isLength({ min: 2, max: 100 }),
	       body('image').optional(),
               body('imageUrl').exists().isURL(),
               body('description').exists().isLength({min: 2, max: 1000}),     
          ]   
       }
  }
}



exports.get_blogposts = function (req, res) {
    Blogpost.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_blogpost = function (req, res) {

    console.log(req.body)
    const errors = validationResult(req)

    let newBlogpost = new Blogpost({
        title: req.body.title,
        image: req.body.image,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
    });

    if(errors.isEmpty()){
        newBlogpost.save();
    }


    res.json({
        data: {
            title: newBlogpost.title,
            image: newBlogpost.image,
            imageUrl: newBlogpost.imageUrl,
            description: newBlogpost.description, 
        },
    });
}

exports.edit_blogpost = function (req, res) {

    const errors = validationResult(req)

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    if(!errors.isEmpty()){
        return res.status(500).send(`Invalid Data`)
    }


    let updatedBlogpost = {
        title: req.body.title,
        image: req.body.image,
        imageUrl: req.body.imageUrl,
        description: req.body.description,   
    }

    Blogpost.findByIdAndUpdate(req.body._id, {$set: updatedBlogpost}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating blogpost')
        }
    })
}

exports.delete_blogpost = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Blogpost.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_blogpost = function (req, res) {
    let id = req.params.id;

    try {
        Blogpost.findById({ _id: id }).exec(function (err, blogpost) {
            if (blogpost) {
                res.send(blogpost);
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