const Book = require('../models/Book');
var ObjectID = require('mongoose').Types.ObjectId

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

    newBook.save();


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
    if(!ObjectID.isValid(req.body._id)){
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
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
