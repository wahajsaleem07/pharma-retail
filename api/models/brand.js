const mongoose = require('mongoose');

const brandSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    logo: { type: String},
    code: { type: String },
    address: String,
    countryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Country'},
    province: String,
    city: String,
    status: String,
});

module.exports = mongoose.model('Brand', brandSchema);