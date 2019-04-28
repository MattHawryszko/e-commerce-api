const express = require('express')
const Product = require('../models/product')
const router = new express.Router()




router.post('/product', async (req, res) => {
  const product = new Product(req.body)
  
  try {
      await product.save()
      res.status(201).send({product})
      
  } catch (e) {
      console.log(e)
      res.status(400).send(e)
  }
})

router.get('/product/:id', async (req, res) => {
  const _id = req.params.id

  try {
      const product = await Product.findById(_id)

      if (!product) {
          return res.status(404).send()
      }

      res.send(product)
  } catch (e) {
      res.status(500).send()
  }
})

module.exports = router