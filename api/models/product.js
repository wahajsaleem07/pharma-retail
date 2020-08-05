const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    code: {type: String, required: true},
    image: String,
    product_category: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductCategories'},
    product_type: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductType'},
    product_origin: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'ProductOrigin'},
    narco_flag: Boolean,
    brandId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand'},
    dosage: String
});

module.exports = mongoose.model('Product', productSchema); 