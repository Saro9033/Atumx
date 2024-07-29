const express = require('express')
const router = express.Router()

const {isAuthenticatedUser} = require('../middlewares/authenticate')
const { createOrder, updateOrderStatus } = require('../controllers/orderController')


//routes for cart
router.route('/place-order').post(isAuthenticatedUser, createOrder)
router.route('/update-status').put(isAuthenticatedUser, updateOrderStatus)


module.exports = router