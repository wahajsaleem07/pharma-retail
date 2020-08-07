const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    code: { type: String },
    address: String,
    registrationNumber: { type: String },
    status: String,
    //registrationNumber: { type: String, required: true, unique: true },
    area: { type: String },
    province: String,
    city: String
});

module.exports = mongoose.model('Supplier', supplierSchema);