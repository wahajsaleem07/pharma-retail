const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true }
});

module.exports = mongoose.model('Country', countrySchema);