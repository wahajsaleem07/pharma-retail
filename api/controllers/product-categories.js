const mongoose = require("mongoose");

const ProductCategories = require("../models/product-categories");

exports.register = (req, res, next) => {
    ProductCategories.find({ name: req.body.name })
        .exec()
        .then(obj => {
            if (obj.length >= 1) {
                return res.status(409).json({
                    message: "Product Categories Name already taken"
                });
            } else {
                const productCat = new ProductCategories({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    code: req.body.code,
                    description: req.body.description
                });
                console.log(1);
                productCat
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Product Category has been created successfully"
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
    ProductCategories.find()
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
    const id = req.params.pCatId;
    ProductCategories.findById(id)
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
    ProductCategories.update({ _id: id }, { $set: updateOps })
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
    ProductCategories.remove({ _id: req.params.pCatId })
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