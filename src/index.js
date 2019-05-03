import morgan from 'morgan';
const express = require('express')
require('./db/mongoose')

var cors = require('cors')

const userRouter = require('./routers/user')
const imageRouter = require('./routers/image')
const productRouter = require('./routers/product')
const cartRouter = require('./routers/cart')
const wishlistRouter = require('./routers/wishlist')

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(cors())
app.use(userRouter)
app.use(imageRouter)
app.use(productRouter)
app.use(cartRouter)
app.use(wishlistRouter)

app.use(morgan('dev'));

app.enable('trust proxy')

app.listen(port, () => {
    console.log('Server is up on port '+port)
})