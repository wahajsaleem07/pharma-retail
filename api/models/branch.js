const mongoose = require('mongoose');

const branchSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    address: String,
    registrationNumber: { type: String, required: true, unique: true },
    area: { type: String, required: true },
    countryId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Country'},
    province: String,
    city: String,
    startingDate: {type: Date, required: true},
    closingDate: {type: Date},
    status: String,
    branchManager: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'}
});

module.exports = mongoose.model('Branch', branchSchema);