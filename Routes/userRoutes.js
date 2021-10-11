const express = require('express')
const {User, validate} = require('../model/userModel')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const router = express.Router()

router.get('/', async(req,res)=>{
    try {
        const user = await User.find().sort('firstName')
        res.status(201).json({
            status:"success",
            data:{
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
})
router.post('/', async(req,res)=>{
    try {
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message)

        let user = await User.findOne({email: req.body.email})
        if(user) return res.status(400).send('User Already Registered...')

        user = new User(_.pick(req.body,['firstName','lastName','email','password','agreeTerm']))
        const satl = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,satl)
        await user.save()
        const token = user.generateAutoToken();
        res.header('x-auth-token',token).status(201).json({
            status: 'success',
            data:{
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                agreeTerm: user.agreeTerm
            }
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
})

module.exports = router;