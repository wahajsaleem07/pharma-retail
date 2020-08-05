const mongoose = require('mongoose');

const prodCategoriesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    code: { type: String, required: true, unique: true },
    description: String
});

module.exports = mongoose.model('ProductCategories', prodCategoriesSchema);