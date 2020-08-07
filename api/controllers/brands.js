const mongoose = require("mongoose");

const Brand = require("../models/brand");

exports.brand_register = (req, res, next) => {
    
    Brand.find({ name: req.body.name })
        .exec()
        .then(brand => {
            if (brand.length >= 1) {
                return res.status(409).json({
                    message: "Brand already registered"
                });
            } else {
                const brand = new Brand({
                    _id: new mongoose.Types.ObjectId(),
                    name: req.body.name,
                    code: req.body.code,
                    registrationNumber: req.body.registrationNumber,
                    status: req.body.status,
                    //countryId: req.body.countryId,
                    address: req.body.address,
                    //logo: req.file.path,
                    province: req.body.province,
                    city: req.body.city
                });

                brand
                    .save()
                    .then(result => {
                        res.status(201).json({
                            message: "Brand has been added successfully",
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

exports.brands_list = (req, res, next) => {
    Brand.find()
        .select()
        .populate('countryId', 'value')
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

exports.brand_detail = (req, res, next) => {
    const id = req.params.brandId;
    Brand.findById(id)
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

exports.brand_patch = (req, res, next) => {
    const id = req.params.brandId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Brand.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Brand information updated successfully"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.brand_delete = (req, res, next) => {
    Brand.remove({ _id: req.params.brandId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Brand removed successfully"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}