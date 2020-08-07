const mongoose = require("mongoose");

const Inventory = require("../models/inventory");

exports.register = (req, res, next) => {
    Inventory.find({ productId: req.body.productId, batchNumber: req.body.batchNumber })
        .exec()
        .then(obj => {
            if (obj.length >= 1 && obj[0].dosage == req.body.dosage) {
                return res.status(409).json({
                    message: "Item already added"
                });
            } else {
                const inventory = new Inventory({
                    _id: new mongoose.Types.ObjectId(),
                    productId: req.body.productId,
                    supplierId: req.body.supplierId,
                    branchId: req.body.branchId,
                    manufactureDate: req.body.manufactureDate,
                    expireDate: req.body.expireDate,
                    batchNumber: req.body.batchNumber,
                    status: req.body.status,
                    retailPrice: req.body.retailPrice,
                    salePrice: req.body.salePrice,
                    totalUnits: req.body.totalUnits,
                    soldUnits: req.body.soldUnits,
                    createdBy: req.body.createdBy,
                    createdDate: new Date()
                });

                inventory
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Inventory has been added successfully",
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
    Inventory.find()
        .populate('productId', 'name dosage')
        .populate('supplierId', 'name')
        .select("productId batchNumber expireDate status salePrice retailPrice totalUnits soldUnits")
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
    Inventory.findById(id)
        .populate('productId', 'name')
        .populate('supplierId', 'name')
        .populate('branchId', 'name')
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
    Inventory.update({ _id: id }, { $set: updateOps })
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
    Inventory.remove({ _id: id })
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