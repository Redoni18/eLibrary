const Categories = require('../models/Categories');
var ObjectID = require('mongoose').Types.ObjectId;

exports.add_categories = function (req, res) {
    try {
        const newCategory = new Categories({
            title: req.body.title,
            description: req.body.description
        });
        newCategory.save();
        res.send('Category added')
    } catch (error) {
        res.send('Category couldnt be added')
    }
}

exports.get_categories = function (req, res) {
    Categories.find().exec(function (err, categories) {
        if (err) return handleError(err);

        res.json(categories);
    });
};

exports.get_category = function (req, res) {
    let id = req.params.id;

    try {
        Categories.findById({ _id: id }).exec(function (err, category) {
            if (category) {
                res.send(category);
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


exports.edit_category = function (req, res) {
    if (!ObjectID.isValid(req.body.id)) {
        return res.status(400).send(`No record with given id:   ${req.body.id}`)
    }
    const updatedCategory = {
        _id: req.body.id,
        title: req.body.title,
        description: req.body.description,
    }

    Categories.findByIdAndUpdate(req.body.id, { $set: updatedCategory }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating Category')
        }
    })
};


exports.delete_category = function (req, res) {
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Categories.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err){
            res.send(docs)
        }else{
            console.log('Error while deleting record')
        }
    })
}
