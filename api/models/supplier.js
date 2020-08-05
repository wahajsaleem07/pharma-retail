const mongoose = require('mongoose');

const supplierSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    address: String,
    registrationNumber: { type: String, required: true, unique: true },
    area: { type: String, required: true },
    province: String,
    city: String,
    status: String
});

module.exports = mongoose.model('Supplier', supplierSchema);