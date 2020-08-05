const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: { type: String, required: true, match: /\w+$/, unique: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true, match: /^[A-Za-z ]+$/ },
    last_name: { type: String, required: true, match: /^[A-Za-z ]+$/ },
    address: String,
    phone_number: { type: Number, required: true, match: /^[0-9]+$/ },
    date_of_birth: Date,
    country: String,
    province: String,
    city: String,
    branch_id: String,
    user_role: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Lookup'},
    status: String
});

module.exports = mongoose.model('User', userSchema);