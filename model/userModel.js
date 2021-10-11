const mongoose = require('mongoose')
const Joi = require('joi');
const PasswordComplexity = require("joi-password-complexity");
const jwt = require('jsonwebtoken')
const userSchema =  new mongoose.Schema({
    firstName:{
        type: String,
        minlength:3,
        maxlenght: 25,
        required: true
    },
    lastName:{
        type: String,
        minlength:3,
        maxlenght: 25,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true,
        minlength:5,
        maxlenght:50
    },
    password:{
        type: String,
        required: true,
    },
    agreeTerm:{
        type: Boolean,
        required: true,
        default:false
    }
})

userSchema.methods.generateAutoToken = () => {
    const token = jwt.sign({_id: this._id}, process.env.PRIVATE_KEY)
    return token;
}

const User = mongoose.model('User', userSchema)



function validateUser(user) {
    const schema = {
        firstName: Joi.string().min(3).max(25).required(),
        lastName: Joi.string().min(3).max(25).required(),
        email: Joi.string().min(5).max(50).required().email(),
        password:  new PasswordComplexity({
            min: 8,
            max: 25,
            lowerCase: 1,
            upperCase: 1,
            numeric: 1,
            symbol: 1,
          }),
        agreeTerm: Joi.boolean().required()
    }
    return Joi.validate(user, schema)
}


exports.User = User;
exports.validate = validateUser;