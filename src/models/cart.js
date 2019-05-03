const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const cartSchema = new mongoose.Schema({
    
    items:[{
        item:{
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
            required: true
        },
    }],
    

},{timestamps: true})


const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
