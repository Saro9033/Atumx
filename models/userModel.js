const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter name']
    },
    email: {
        type: String,
        required: [true, 'Please enter Email Id'],
        unique: [true, 'Duplicate Key error'],
        trim: true,
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'Please enter Email Id'],
        select:false
    },
    role:{
        type:String,
        default:'user'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//middleware function to hiding(hashing) passoword
userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

//To generate JWT token
userSchema.methods.getJwtToken = function(){
    return jwt.sign({id:this.id}, process.env.JWT_SECRET,
        {expiresIn:process.env.JWT_EXPIRES_TIME}
    )
}

//To validate password
userSchema.methods.isValidPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}


module.exports = mongoose.model('User', userSchema)