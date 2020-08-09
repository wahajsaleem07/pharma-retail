const mongoose = require("mongoose");

const Branch = require("../models/branch");

exports.branch_register = (req, res, next) => {
    Branch.find({ name: req.body.name })
        .exec()
        .then(branch => {
            if (branch.length >= 1) {
                return res.status(409).json({
                    message: "Branch Name already taken"
                });
            } else {
                const branch = new Branch({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    address: req.body.address,
                    registrationNumber: req.body.registrationNumber,
                    area: req.body.area,
                    countryId: req.body.countryId,
                    province: req.body.province,
                    city: req.body.city,
                    startingDate: req.body.startingDate,
                    status: req.body.status,
                    branchManager: req.body.branchManager
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
        })
        .catch(err => {
            console.log(err);
        });
}

exports.branches_list = (req, res, next) => {
    Branch.find()
        .select()
        .populate('branchManager', 'username')
        .populate('countryId', 'value')
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json({
                branches: docs,
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

exports.branch_detail = (req, res, next) => {
    const id = req.params.branchId;
    Branch.findById(id)
        .populate('branchManager', 'username')
        .populate('countryId', 'value')
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

exports.branch_patch = (req, res, next) => {
    const id = req.params.branchId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Branch.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Branch information updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.branch_delete = (req, res, next) => {
    Branch.remove({ _id: req.params.branchId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Branch deleted successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}