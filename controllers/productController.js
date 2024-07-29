
const catchAsyncError = require('../middlewares/catchAsyncError');
const Product = require('../models/productModel');


//create product 
exports.addProduct = catchAsyncError(async (req, res, next) => {
    try {
        const product = await Product.create({...req.body})
        res.status(200).json({ success: true, product });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
})

// Delete product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    const productId = req.params.id;
    if (!productId) {
        return res.status(400).json({ success: false, message: "Product ID is required" });
    }
    const product = await Product.findByIdAndDelete(productId);

    if (!product) {
        return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product, message: "Product deleted successfully" });
});