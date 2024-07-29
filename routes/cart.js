const express = require('express')
const router = express.Router()

const {isAuthenticatedUser} = require('../middlewares/authenticate')
const { addItem, viewCart, removeItem, updateQuantity } = require('../controllers/cartController')


//routes for cart
router.route('/addItem').post(isAuthenticatedUser, addItem)
router.route('/view-cart-items').get(isAuthenticatedUser, viewCart)
router.route('/remove-item/:productId').delete(isAuthenticatedUser, removeItem)
router.route('/update-quantity').put(isAuthenticatedUser, updateQuantity)


module.exports = router