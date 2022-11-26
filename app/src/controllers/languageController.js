const Language = require('../models/Language');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_languages = function(req, res) {
    Language.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while retrieving data')
        }
    })
};

exports.post_language = function(req, res) {

    console.log(req.body)

    let newLanguage = new Language({
        languageName: req.body.languageName
    });

    newLanguage.save();

    res.json({
        data: {
            languageName: newLanguage.languageName
        },
    });
}




exports.delete_language = function(req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Language.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
}

exports.get_language = function(req, res) {
    let id = req.params.id;

    try {
        Language.findById({ _id: id }).exec(function(err, language) {
            if (language) {
                res.send(language);
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