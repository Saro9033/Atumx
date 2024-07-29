const express = require('express')
const router = express.Router()

const {isAuthenticatedUser} = require('../middlewares/authenticate')
const { addProduct, deleteProduct } = require('../controllers/productController')


//routes for cart
router.route('/create-product').post(isAuthenticatedUser, addProduct)
router.route('/delete-product/:id').delete(isAuthenticatedUser, deleteProduct)


module.exports = router