const express = require('express')
const router = express.Router()
const {registerUser, loginUser, logoutUser,
    getUserProfile
   } = require('../controllers/authController')

const {isAuthenticatedUser} = require('../middlewares/authenticate')


//routes for login/register users
router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)
router.route('/myprofile').get(isAuthenticatedUser, getUserProfile)



module.exports = router