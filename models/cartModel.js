const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId,
        ref:'User', 
        required: true },
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Product',
        required: true },
    quantity: { type: Number, required: true }
});

CartSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('Cart', CartSchema)