const express = require('express')
const Cart = require('../models/cart')
const router = new express.Router()

router.post('/cart', async (req, res) => {
    const wishlist = new Cart(req.body)
    
    try {
        await wishlist.save()
        res.status(201).send({wishlist})
        
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.get('/cart/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const cart = await Cart.findById(_id)

        if (!cart) {
            return res.status(404).send()
        }

        res.send(cart)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/cart/:id' , async (req, res) => {
    const updates = Object.keys(req.body)

    try {
        const cart = await Cart.findById(req.params.id)
        updates.forEach((update) => cart[update] = req.body[update])
        await cart.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!cart) {
            return res.status(404).send()
        }

        res.send(cart)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router