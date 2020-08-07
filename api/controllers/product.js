const mongoose = require("mongoose");

const Product = require("../models/product");

exports.register = (req, res, next) => {
    Product.find({ name: req.body.name })
        .exec()
        .then(obj => {
            if (obj.length >= 1 && obj[0].dosage == req.body.dosage) {
                return res.status(409).json({
                    message: "Product already added"
                });
            } else {
                const product = new Product({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    code: req.body.code,
                    //image: req.file.path,
                    narco_flag: req.body.narcoFlag,
                    dosage: req.body.dosage,
                    brandId: req.body.brandId,
                    product_category: req.body.productCategory,
                    product_origin: req.body.productOrigin,
                    product_type: req.body.productType
                });

                product
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Product has been added successfully",
                            createdProduct: result
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
}

exports.getall = (req, res, next) => {
    Product.find()
        .populate('product_category', 'name')
        .populate('product_origin', 'name')
        .populate('product_type', 'name')
        .populate('brandId', 'name')
        .exec()
        .then(docs => {
            console.log(docs);
            if (docs.length >= 0) {
                res.status(200).json({
                    items: docs,
                    count: docs.length
                });
            } else {
                res.status(404).json({
                    message: 'No entries found'
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.get = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id)
        .populate('product_category', 'name')
        .populate('product_origin', 'name')
        .populate('product_type', 'name')
        .populate('brandId', 'name')
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json(doc);
            } else {
                res
                    .status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.update = (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.remove = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}