const mongoose = require('mongoose')
const Joi = require('joi');
var categoriesSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    subcategories: {
    name : String,
     }
});

const Categories = mongoose.model("Categories",categoriesSchema)
const addProductSchema = new mongoose.Schema({

    title: {
        type: String,
        default: '',
        trim: true,

    },
    image:[String],
    description: {
        type: String,
        default: '',
        trim: true
    },
    price:{
        type: Number,
        required: true
    },
    firm:{
        type: Boolean,
    },
    Categories : [categoriesSchema]
});

const Product = mongoose.model('Product',addProductSchema)

exports.Categories = Categories;
exports.Product = Product;