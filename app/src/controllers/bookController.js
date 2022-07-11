const Book = require('../models/Book');
var ObjectID = require('mongoose').Types.ObjectId
const { body, validationResult } = require('express-validator/check')

//validation method
exports.validate = (method) => {
  switch (method) {
    case 'post_book': {
     return [ 
            body('title').exists().isLength({ min: 2, max: 100 }),
            body('author').exists().isLength({min: 2, max: 100}),
            body('description').exists().isLength({min: 2, max: 1000}),
            body('year').exists().isInt(),
            body('image').optional(),
            body('imageUrl').exists().isURL(),
            body('isbn').exists().isInt().isLength({ min: 13, max: 13 }),
            body('categories').exists()
       ]   
    }
    case 'edit_book': {
        return [ 
               body('title').exists().isLength({ min: 2, max: 100 }),
               body('author').exists().isLength({min: 2, max: 100}),
               body('description').exists().isLength({min: 2, max: 1000}),
               body('year').exists().isInt(),
               body('image').optional(),
               body('imageUrl').exists().isURL(),
               body('isbn').exists().isInt().isLength({ min: 13, max: 13 }),
               body('categories').exists()
          ]   
       }
  }
}



exports.get_books = function (req, res) {
    Book.find((err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while retrieving data')
        }
    })
};

exports.post_book = function (req, res) {

    console.log(req.body)
    const errors = validationResult(req)

    let newBook = new Book({
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        year: req.body.year,
        image: req.body.image,
        imageUrl: req.body.imageUrl,
        isbn: req.body.isbn,
        categories: req.body.categories
    });

    if(errors.isEmpty()){
        newBook.save();
    }


    res.json({
        data: {
            title: newBook.title,
            author: newBook.author,
            description: newBook.description,
            year: newBook.year,
            image: newBook.image,
            imageUrl: newBook.imageUrl,
            isbn: newBook.isbn,
            categories: newBook.categories
        },
    });
}

exports.edit_book = function (req, res) {

    const errors = validationResult(req)

    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    if(!errors.isEmpty()){
        return res.status(500).send(`Invalid Data`)
    }


    let updatedBook = {
        title: req.body.title,
        author: req.body.author,
        description: req.body.description,
        year: req.body.year,
        image: req.body.image,
        imageUrl: req.body.imageUrl,
        isbn: req.body.isbn,
        categories: req.body.categories
    }

    Book.findByIdAndUpdate(req.body._id, {$set: updatedBook}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating book')
        }
    })
}

exports.delete_book = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Book.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.get_book = function (req, res) {
    let id = req.params.id;

    try {
        Book.findById({ _id: id }).exec(function (err, book) {
            if (book) {
                res.send(book);
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
