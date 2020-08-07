const mongoose = require("mongoose");

const Supplier = require("../models/supplier");

exports.supplier_register = (req, res, next) => {
    Supplier.find({ name: req.body.name })
        .exec()
        .then(supplier => {
            if (supplier.length >= 1) {
                return res.status(409).json({
                    message: "Supplier already registered"
                });
            } else {
                const supplier = new Supplier({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    address: req.body.address,
                    registrationNumber: req.body.registrationNumber,
                    area: req.body.area,
                    province: req.body.province,
                    city: req.body.city,
                    status: req.body.status
                });

                supplier
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "sUPPLIER has been added successfully",
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
        })
        .catch(err => {
            console.log(err);
        });
}

exports.supplier_list = (req, res, next) => {
    Supplier.find()
        .select()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                items: docs,
                count: docs.length
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.supplier_detail = (req, res, next) => {
    const id = req.params.supplierId;
    Supplier.findById(id)
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

exports.supplier_patch = (req, res, next) => {
    const id = req.params.supplierId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Supplier.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Supplier information updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.supplier_delete = (req, res, next) => {
    Supplier.remove({ _id: req.params.supplierId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Supplier has been deleted successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}