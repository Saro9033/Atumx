
//This function will create JWT Token
const sendToken= (user, statusCode, res)=>{
    const token = user.getJwtToken()

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
        httpOnly:true,
        sameSite: 'none', 
        secure: true, 
    }

    res.status(statusCode)
    .cookie('token',token, options)
    .json({
        success: true,
         message: 'Authenticate Successfully',
        user,
        token
    })
}

module.exports = sendToken