const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    code: { type: String },
    address: String,
    registrationNumber: { type: String },
    status: String,
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
    logo: { type: String },
    province: String,
    city: String
});

module.exports = mongoose.model('Brand', brandSchema);