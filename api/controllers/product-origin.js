const mongoose = require("mongoose");

const ProductOrigin = require("../models/product-origin");

exports.register = (req, res, next) => {
    ProductOrigin.find({ name: req.body.name })
        .exec()
        .then(obj => {
            if (obj.length >= 1) {
                return res.status(409).json({
                    message: "Product Origin Name already registered"
                });
            } else {
                const productOrigin = new ProductOrigin({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                });

                productOrigin
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Product Origin has been added successfully"
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
            }
        })
        .catch(err => {
            console.log(err);
        });
}

exports.listall = (req, res, next) => {
    ProductOrigin.find()
        .select()
        .exec()
        .then(docs => {
            res.status(200).json({
                objes: docs,
                count: docs.length
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.detail = (req, res, next) => {
    const id = req.params.pCatId;
    ProductOrigin.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
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

exports.patch = (req, res, next) => {
    const id = req.params.pCatId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProductOrigin.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Category information updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete = (req, res, next) => {
    ProductOrigin.remove({ _id: req.params.pCatId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Category deleted successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}