const mongoose = require('mongoose');

const prodTypeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: String
});

module.exports = mongoose.model('ProductType', prodTypeSchema);