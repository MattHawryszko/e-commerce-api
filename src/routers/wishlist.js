const express = require('express')
const Wishlist = require('../models/wishlist')
const router = new express.Router()

router.post('/wishlist', async (req, res) => {
    const wishlist = new Wishlist(req.body)
    
    try {
        await wishlist.save()
        res.status(201).send({wishlist})
        
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})


router.get('/wishlist/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const wishlist = await Wishlist.findById(_id)

        if (!wishlist) {
            return res.status(404).send()
        }

        res.send(wishlist)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/wishlist/:id' , async (req, res) => {


    try {
        const wishlist = await Wishlist.findById(req.params.id)
        wishlist.items.push(req.body)

        await wishlist.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!wishlist) {
            return res.status(404).send()
        }

        res.send(wishlist)
    } catch (e) {
        res.status(400).send(e)
    }
})
router.patch('/wishlist/remove/:id' , async (req, res) => {

    try {

        const wishlist = await Wishlist.findById(req.params.id)



        var index = wishlist.items.forEach(function(element, index) {
            if(element.item == req.body.item){
                return index;
            }
        });
        if(index !== -1){
            wishlist.items.splice(index, 1)
        }
       
        

        await wishlist.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!wishlist) {
            return res.status(404).send()
        }

        res.send(wishlist)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router