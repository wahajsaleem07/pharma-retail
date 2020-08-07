const mongoose = require("mongoose");

const ProductType = require("../models/product-type");

exports.register = (req, res, next) => {
    ProductType.find({ name: req.body.name })
        .exec()
        .then(obj => {
            if (obj.length >= 1) {
                return res.status(409).json({
                    message: "Product Type already added"
                });
            } else {
                const productType = new ProductType({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                });

                productType
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Product Type has been created successfully",
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
    ProductType.find()
        .select()
        .exec()
        .then(docs => {
            res.status(200).json({
                items: docs,
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
    const id = req.params.pTypeId;
    ProductType.findById(id)
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
    const id = req.params.pTypeId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    ProductType.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Type information updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.delete = (req, res, next) => {
    ProductType.remove({ _id: req.params.pTypeId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Type deleted successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}