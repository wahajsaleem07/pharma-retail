const mongoose = require('mongoose');

const prodOriginSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: String
});

module.exports = mongoose.model('ProductOrigin', prodOriginSchema);