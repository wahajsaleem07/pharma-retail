const express = require("express");
const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const Lookup = require("../models/lookup");

exports.lookup = (req, res, next) => {
    const branch = new Lookup({
        _id: new mongoose.Types.ObjectId(),
        value: "Saleman",
        code: "SALEMAN",
        lookup_type: "Employee_Role"
    });

    branch
        .save()
        .then(result => {
            res.status(201).json({
                message: "Branch has been created successfully",
                userName: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.login = (req, res, next) => {
    User.find({ username: req.body.username })
        .populate('user_role', 'value')
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: "invalid Username/Password"
                });
            }
            // bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            //     if (err) {
            //         return res.status(401).json({
            //             message: "Invalid Username/Password"
            //         });
            //     }
            //     if (result) {
            //         const token = jwt.sign(
            //             {
            //                 userId: user[0]._id,
            //                 role: user[0].user_role.value
            //             },
            //             process.env.JWT_KEY,
            //             {
            //                 expiresIn: "1h"
            //             }
            //         );
            //         const userObj = {
            //             id: user[0]._id,
            //             username: user[0].username,
            //             firstName: user[0].first_name,
            //             lastName: user[0].last_name,
            //             branchId: user[0].branch_id,
            //             userRole: user[0].user_role.value,
            //             status: user[0].status,
            //             token: token
            //         };

            //         return res.status(200).json({
            //             message: "Authorization successful",
            //             user: userObj
            //         });
            //     }
            //     res.status(401).json({
            //         message: "Authorization failed"
            //     });
            // });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}