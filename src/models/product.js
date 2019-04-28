const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
productname: {
    type: String,
    required: true,
    trim: true
},
categories: [],
tags: {
    type: String,
    required: true,
    trim: true
},
description: {
    type: String,
    required: true,
    trim: true
},
reviews: {
    type: String,
    required: false,
    trim: true
},
price: {
    type: String,
    required: false,
    trim: true
},
saleprice: {
    type: String,
    required: false,
    trim: true
},
images: []
},{timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
