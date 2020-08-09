const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.user_register = (req, res, next) => {
    console.log(1);
    User.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: "Username already given to an employee"
                });
            } else {
                // bcrypt.hash(req.body.password, 10, (err, hash) => {
                //     if (err) {
                //         return res.status(500).json({
                //             error: err
                //         });
                //     } else {
                //         const user = new User({
                //             _id: new mongoose.Types.ObjectId(),
                //             password: hash,
                //             username: req.body.username,
                //             first_name: req.body.firstName,
                //             last_name: req.body.lastName,
                //             address: req.body.address,
                //             phone_number: req.body.phoneNumber,
                //             date_of_birth: req.body.dateOfBirth,
                //             country: req.body.country,
                //             province: req.body.province,
                //             city: req.body.city,
                //             branch_id: req.body.branchId,
                //             status: req.body.status,
                //             user_role: req.body.userRole
                //         });

                //         user
                //             .save()
                //             .then(result => {
                //                 res.status(201).json({
                //                     message: "User has been created successfully",
                //                     userName: result.username
                //                 });
                //             })
                //             .catch(err => {
                //                 console.log(err);
                //                 res.status(500).json({
                //                     error: err
                //                 });
                //             });
                //     }
                // });
            }
        });
}

exports.users_list = (req, res, next) => {
    User.find()
        .select("username first_name last_name phone_number user_role status")
        .populate('user_role', 'value')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                users: docs.filter(doc => doc.user_role.value != "Owner" && doc.user_role.value != "Admin")
                    .map(doc => {
                        return {
                            _id: doc._id,
                            name: doc.first_name + " " + doc.last_name,
                            username: doc.username,
                            phoneNumber: doc.phone_number,
                            status: doc.status,
                            userRole: doc.user_role.value
                        };
                    }),
                count: docs.filter(doc => doc.user_role.value != "Owner" && doc.user_role.value != "Admin").length
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.user_detail = (req, res, next) => {
    const id = req.params.userId;
    User.findById(id)
        .populate('user_role', 'value')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    user: {
                        _id: doc._id,
                        name: doc.first_name + " " + doc.last_name,
                        username: doc.username,
                        phoneNumber: doc.phone_number,
                        address: doc.address,
                        status: doc.status,
                        userRole: doc.user_role.value
                    }
                });
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
}

exports.user_patch = (req, res, next) => {
    const id = req.params.userId;
    const updateOps = {};
    for (const ops of req.body) {
        console.log(ops);
        updateOps[ops.propName] = ops.value;
    }
    console.log(updateOps);

    User.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.user_delete = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}