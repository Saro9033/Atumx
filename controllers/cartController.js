const catchAsyncError = require('../middlewares/catchAsyncError');
const Cart = require('../models/cartModel');


//add Item to the cart
exports.addItem = catchAsyncError(async (req, res, next) => {
    try {
        const { product, quantity } = req.body;
        const cartItem = await Cart.findOneAndUpdate(
            { user: req.user.id, product },
            { $inc: { quantity } },
            { new: true, upsert: true }
        );
        res.status(200).json({ success: true, cartItem });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

//viewCart Item 
exports.viewCart = catchAsyncError(async (req, res) => {
    try {
        const user = req.user.id;
        const cartItems = await Cart.find({ user });
        res.status(200).json(cartItems);
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

//remove items from the cart
exports.removeItem = catchAsyncError(async (req, res) => {
    try {
        const { productId } = req.params;
        await Cart.deleteOne({ user: req.user.id, product:productId });
        res.status(200).json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

//update quantity of the product
exports.updateQuantity = catchAsyncError(async (req, res) =>{
    try {
        const { product, quantity } = req.body;
        const cartItem = await Cart.findOneAndUpdate(
            { user:req.user.id,product },
            { quantity },
            { new: true }
        );
        res.status(200).json({ success: true, cartItem });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})