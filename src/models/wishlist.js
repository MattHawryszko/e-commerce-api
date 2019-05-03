const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')


const wishlistSchema = new mongoose.Schema({
    
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
    }]

},{timestamps: true})


const Wishlist = mongoose.model('Wishlist', wishlistSchema)

module.exports = Wishlist
