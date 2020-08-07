const mongoose = require('mongoose');

const inventorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    productId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product'},
    supplierId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Supplier'},
    branchId: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Branch'},
    manufactureDate: { type: Date, required: true },
    expireDate: { type: Date, required: true },
    batchNumber: { type: String, required: true },
    status: Boolean,
    retailPrice: { type: String, required: true },
    salePrice: { type: String, required: true },
    totalUnits: { type: Number, required: true },
    soldUnits: { type: Number, required: true },
    createdBy: { type: String, required: true },
    createdDate: { type: Date, required: true },
    updatedBy: { type: String },
    updatedDate: { type: Date },
});

module.exports = mongoose.model('Inventory', inventorySchema); 