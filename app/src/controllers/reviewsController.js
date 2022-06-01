const Review = require('../models/Review');
var ObjectID = require('mongoose').Types.ObjectId;


exports.add_review = function (req, res) {
    const newReview = new Review({
        bookId: req.body.bookId,
        book: req.body.book,
        author: req.body.author,
        review: req.body.review,
        username: req.body.username
    })
    newReview.save();
    res.json({
        data: {
            bookId: newReview.bookId,
            book: newReview.book,
            author: newReview.author,
            review: newReview.review,
            username: newReview.username
        }
    });
}

exports.delete_review = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Review.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}

exports.reviews = function (req, res) {
    let id = req.params.id;
    try {
        Review.find({ bookId: id }).exec(function (err, review) {
            if (review) {
                res.send(review);
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

exports.edit_review = function (req, res) {
    if (!ObjectID.isValid(req.body.id)) {
        return res.status(400).send(`No record with given id:   ${req.body.id}`)
    }
    const updatedReview = {
        _id: req.body.id,
        bookId: req.body.bookId,
        review: req.body.review,
    }

    Review.findByIdAndUpdate(req.body.id, { $set: updatedReview }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating Review')
        }
    })
};


exports.get_review = function (req, res) {
    let id = req.params.id;

    try {
        Review.findById({ _id: id }).exec(function (err, review) {
            if (review) {
                res.send(review);
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

