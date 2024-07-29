const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
    items: [{
        productId: mongoose.Schema.Types.ObjectId,
        quantity: Number
    }]
});

module.exports = mongoose.model('Order', OrderSchema)