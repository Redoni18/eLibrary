const Staff = require('../models/Staff');
var ObjectID = require('mongoose').Types.ObjectId

exports.get_staffs = function(req, res) {
    Staff.find((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while retrieving data')
        }
    })
};

exports.post_staff = function(req, res) {

    console.log(req.body)

    let newStaff = new Staff({
        staffName: req.body.staffName,
        staffEmail: req.body.staffEmail,
        position: req.body.position,
    });

    newStaff.save();

    res.json({
        data: {
            staffName: newStaff.staffName,
            staffEmail: newStaff.staffEmail,
            position: newStaff.position,
        },
    });
}


exports.edit_staff = function(req, res) {
    if (!ObjectID.isValid(req.body._id)) {
        return res.status(400).send(`No record with given id:   ${req.body._id}`)
    }

    let updatedStaff = {
        staffName: req.body.staffName,
        staffEmail: req.body.staffEmail,
        position: req.body.position,
    }

    Staff.findByIdAndUpdate(req.body._id, { $set: updatedStaff }, { new: true }, (err, doc) => {
        if (!err) {
            res.send(doc)
        } else {
            console.log('Error while updating staff')
        }
    })
}

exports.delete_staff = function(req, res) {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send(`No record with given id: ${req.params.id}`)
    }

    Staff.findByIdAndRemove(req.params.id, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while deleting record')
        }
    })
}

exports.get_staff = function(req, res) {
    let id = req.params.id;

    try {
        Staff.findById({ _id: id }).exec(function(err, staff) {
            if (staff) {
                res.send(staff);
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