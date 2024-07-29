//Handle error if any function got

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    let message = err.message;
    let error = new Error(message)

    if(err.code == 11000){
        message = `Duplicate ${Object.keys(err.keyValue)} error`
        error = new Error(message)
    }

    if(err.name == "JSONWebTokenError"){
        message = `JSON Web Token is invalid. Try again`
        error = new Error(message)
    }

    if(err.name == "TokenExpiredError"){
        message = `JSON Web Token is Expired. Try again`
        error = new Error(message)
    }

    res.status(err.statusCode).json({
        success: false,
        message: error.message || "Internal Server Error",
       stack: err.stack,
      error:err
    })

}