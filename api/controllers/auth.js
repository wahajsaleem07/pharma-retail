const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

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
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Invalid Username/Password"
                    });
                }
                if (result) {
                    const token = jwt.sign(
                        {
                            userId: user[0]._id,
                            role: user[0].user_role.value
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Authorization successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Authorization failed"
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}