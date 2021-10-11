const express = require('express');
const {Categories} = require('../model/categoryProductModel')


const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        let category = new Categories({ 
            name: req.body.name,
            name: req.body.name,
        });
        category = await category.save();  
        res.send(category);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
})

module.exports = router;