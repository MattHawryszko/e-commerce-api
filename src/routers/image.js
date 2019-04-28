const express = require('express')
const Image = require('../models/image')
const router = new express.Router()

const path = require('path')
var fs = require('fs');
const multer = require('multer')
const UPLOAD_PATH = path.resolve(__dirname, 'path/to/uploadedFiles')
const upload = multer({
    dest: UPLOAD_PATH,
    limits: {fileSize: 1000000, files: 5}
  })

router.post('/images', upload.array('image', 5), (req, res, next) => {
    const images = req.files.map((file) => {
      return {
        filename: file.filename,
        originalname: file.originalname
      }
    })
    console.log("uploaded")
    Image.insertMany(images, (err, result) => {
      if (err) return res.sendStatus(404)
      res.json(result)
    })
  })

router.get('/images/:id', async (req, res, next) => {
    try {
        Image.findOne({_id: req.params.id}, (err, image) => {
            if (err) return res.sendStatus(404)
            fs.createReadStream(path.resolve(UPLOAD_PATH, image.filename)).pipe(res)
          })
    } catch (e) {
        res.status(500).send()
    }
})
module.exports = router