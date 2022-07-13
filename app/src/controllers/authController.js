const User = require("../models/User");
const auth = require("../helper/auth");
const bcrypt = require('../helper/bcrypt.js');



exports.post_signup = function (req, res) {

    let hash_password = bcrypt.hash(req.body.password);

    let user = new User({
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        password: hash_password,
        isAdmin: req.body.email.includes('@eLibrary') ? true : false,
        isMember: req.body.isMember
    });

    user.save();

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

exports.edit_profile = function (req, res) {

    let updatedInfo = {
        name: req.body.name,
        email: req.body.email,
        userType: req.body.userType,
        bio: req.body.bio,
        city: req.body.city,
        birthday: req.body.birthday,
        social1: req.body.social1,
        social2: req.body.social2,
        social3: req.body.social3
    }


    User.findByIdAndUpdate(req.body._id, {$set: updatedInfo}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating user profile')
        }
    })
};

exports.get_profile = function (req, res) {
    let id = req.params.id;

    try {
        User.findById({ _id: id }).exec(function (err, user) {
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


exports.post_signin = function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.findOne({ email: email }).exec(function (err, user) {
        if (user === null) {

            res.sendStatus(401);
        }
        else if (bcrypt.compare(password, user.password)) {
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



exports.get_auth = function (req, res, next) {
    res.sendStatus(200);
};

exports.update_membership = function (req, res) {

    let updatedInfo = {
        isMember: req.body.isMember,
    }


    User.findByIdAndUpdate(req.body._id, {$set: updatedInfo}, {new: true}, (err, doc) => {
        if(!err){
            res.send(doc)
        }else{
            console.log('Error while updating user profile')
        }
    })
};