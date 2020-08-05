const mongoose = require('mongoose');

const lookupSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    value: {type: String, required: true},
    code: {type: String, required: true},
    lookup_type: {type: String, required: true},
    description: String
});

module.exports = mongoose.model('Lookup', lookupSchema); 