import express, { application } from 'express'

import colors from 'colors'

import dotenv from 'dotenv'

import productRoutes from './routes/productRoutes.js'

import userRoutes from './routes/userRoutes.js'

dotenv.config()

import products from './data/products.js'

import connectDB from './config/db.js'

connectDB()

const app = express()

app.get('/', (req,res) => {
  res.send('API is running....')
})

app.use('/api/products', productRoutes)

app.use('/api/users',userRoutes)






const PORT = process.env.PORT || 6000

app.listen(PORT, console.log(`server running on port ${PORT} in ${process.env.NODE_ENV}`.yellow.bold))
