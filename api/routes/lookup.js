const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Lookup = require("../models/lookup");

router.post("", (req, res, next) => {
    const lookup = new Lookup({
        _id: new mongoose.Types.ObjectId(),
        value: req.body.value,
        code: req.body.code,
        lookup_type: req.body.lookup_type,
        description: req.body.description
    });

    lookup
        .save()
        .then(result => {
            res.status(201).json({
                message: "Lookup has been added successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;