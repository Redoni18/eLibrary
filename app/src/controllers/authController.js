const User = require("../models/User");
const auth = require("../helper/auth");
const bcrypt = require('../helper/bcrypt.js');
var ObjectID = require('mongoose').Types.ObjectId

const { body, validationResult } = require('express-validator/check')

//validation method
exports.validate = (method) => {
    switch (method) {
        case 'post_signup':
            {
                return [
                    body('name').exists().isLength({ min: 2, max: 50 }),
                    body('email').isEmail(),
                    body('userType').exists()
                ]
            }
        case 'edit_profile':
            {
                return [
                    body('name').exists().isLength({ min: 2, max: 50 }),
                    body('email').isEmail(),
                ]
            }
        case 'edit_user':
            {
                return [
                    body('email').isEmail()
                ]
            }

    }
}




exports.post_signup = function(req, res) {

    let hash_password = bcrypt.hash(req.body.password);

    const errors = validationResult(req)

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        password: hash_password,
        isAdmin: req.body.email.includes('@eLibrary') ? true : false,
        isMember: req.body.isMember
    });

    if (errors.isEmpty()) {
        user.save();
    }

    let payload = { id: user.id };
    let token = auth.encode(payload);

    res.json({
        data: {
            id: user._id,
            name: user.name,
            email: user.email,
            userType: user.userType,
            isAdmin: user.isAdmin,
            isMember: user.isMember
        },
        token: token
    });
};

exports.edit_profile = function(req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(500).send(`Invalid Data`)
    }

    let updatedInfo = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        bio: req.body.bio,
        city: req.body.city,
        birthday: req.body.birthday,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3,
        isAdmin: req.body.email.includes('@eLibrary') ? true : false
    }


    User.findByIdAndUpdate(req.body._id, { $set: updatedInfo }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user profile')
        }
    })
};

exports.edit_user = function(req, res) {

    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(500).send(`Invalid Data`)
    }

    let updatedInfo = {
        email: req.body.email,
        isAdmin: req.body.email.includes('@eLibrary') ? true : false
    }

    User.findByIdAndUpdate(req.body._id, { $set: updatedInfo }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user')
        }
    })
};

exports.delete_user = function(req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    User.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
};


exports.get_profile = function(req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function(err, user) {
            if (user) {
                res.send(user);
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


exports.post_signin = function(req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }).exec(function(err, user) {
        if (user === null) {

            res.sendStatus(401);
        } else if (bcrypt.compare(password, user.password)) {
            let payload = { id: user.id };
            let token = auth.encode(payload);

            res.json({
                data: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    bio: user.bio,
                    city: user.city,
                    birthday: user.birthday,
                    social1: user.social1,
                    social2: user.social2,
                    social3: user.social3,
                    isAdmin: user.isAdmin,
                    isMember: user.isMember
                },
                token: token
            });
        } else {
            res.sendStatus(401);
        }
    });
};



exports.get_auth = function(req, res, next) {
    res.sendStatus(200);
};

exports.update_membership = function(req, res) {

    let updatedInfo = {
        isMember: req.body.isMember,
    }


    User.findByIdAndUpdate(req.body._id, { $set: updatedInfo }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user profile')
        }
    })
};

exports.get_membership = function(req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function(err, user) {
            if (user) {
                res.send(user);
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


exports.borrow_books = function(req, res) {
    let borrowedBooks = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        bio: req.body.bio,
        city: req.body.city,
        birthday: req.body.birthday,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3,
        isAdmin: req.body.isAdmin,
        books: req.body.books
    }

    User.findByIdAndUpdate(req.body._id, { $set: borrowedBooks }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user profile')
        }
    })
};

exports.get_borrowed_books = function(req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function(err, user) {
            if (user) {
                res.send(user);
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

exports.favourite_books = function(req, res) {
    let favouriteBooks = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        bio: req.body.bio,
        city: req.body.city,
        birthday: req.body.birthday,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3,
        isAdmin: req.body.isAdmin,
        books: req.body.books,
        favouriteBooks: req.body.favouriteBooks
    }

    User.findByIdAndUpdate(req.body._id, { $set: favouriteBooks }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user profile')
        }
    })
};

exports.get_favourited_books = function(req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function(err, user) {
            if (user) {
                res.send(user);
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


// -----------------------



exports.cart_books = function(req, res) {
    let cartBooks = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        bio: req.body.bio,
        city: req.body.city,
        birthday: req.body.birthday,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3,
        isAdmin: req.body.isAdmin,
        books: req.body.books,
        cartBooks: req.body.cartBooks
    }

    User.findByIdAndUpdate(req.body._id, { $set: cartBooks }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating user profile')
        }
    })
};

exports.get_cart_books = function(req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function(err, user) {
            if (user) {
                res.send(user);
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