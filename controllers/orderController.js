const catchAsyncError = require('../middlewares/catchAsyncError');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

exports.createOrder = catchAsyncError(async (req, res)=> {
    try {
        const user = req.user.id;
        const cartItems = await Cart.find({ user });

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, message: 'Cart is empty' });
        }

        const orderItems = cartItems.map(item => ({
            product: item.product,
            quantity: item.quantity
        }));

        const order = new Order({
            user,
            items: orderItems
        });

        await order.save();
        await Cart.deleteMany({ user });

        res.status(201).json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

exports.updateOrderStatus= catchAsyncError(async (req, res)=> {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
        res.status(200).json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})