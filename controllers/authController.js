const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const errorHandler = require("../utils/errorHandler");
const sendToken = require('../utils/jwt')
const crypto = require('crypto')

//Get User Profile - api/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {

    try {
        const user = await User.findById(req.user.id).populate('addresses');

        if (!user) {
            return next(new errorHandler("User not found", 404));
        }

        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(new errorHandler("Server error", 500));
    }
});


//To register user
exports.registerUser = catchAsyncError(async (req, res) => {
    const { name, email, password, role } = req.body
    const user = await User.create({
        name, email, password, role
    })
    sendToken(user, 201, res)
})

//To Login user = /api/login
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return next(new errorHandler('Please enter email & password', 400))
    }
    //finding the user data from Database 
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new errorHandler('Invalid email or password', 401))
    }

    if (! await user.isValidPassword(password)) {
        return next(new errorHandler('Invalid email or password', 401))
    }

    sendToken(user, 201, res)
})

//To logout User = /api/logout
exports.logoutUser = (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    })
        .status(200)
        .json({
            success: true,
            message: "Logged Out"
        })
}
