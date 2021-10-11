const express = require('express');
const {Product} = require('../model/categoryProductModel')


const router = express.Router();

router.post('/',async(req,res)=>{
    try {
        let product = new Product({ 
            title: req.body.name,
            image: req.body.name,
            description: req.body.description,
            price: req.body.price,
            firm:req.body.firm
        });
        product = await product.save();  
        res.send(product);
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
})

module.exports = router;