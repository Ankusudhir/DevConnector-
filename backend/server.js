import express from'express'

import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import { errorHandler, notFound} from './middleware/errorMiddleware.js'

import dotenv from 'dotenv'

import morgan from 'morgan'

import connectDB from './config/db.js'

import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

import userRoutes from './routes/userRoutes.js'

import orderRoute from './routes/orderRoute.js'

import path from 'path'



dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'production')
{
  app.use(morgan('dev'))
}

/*app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../', 'build', 'index.html'));
});*/

app.use(express.json())


  app.use(morgan('dev'))

app.use('/api/products',productRoutes);

app.use('/api/users', userRoutes)

app.use('/api/orders', orderRoute)

app.get('/api/config/paypal',(req,res) => res.send(process.env.PAYPAL_CLIENT_ID))
app.use(notFound)

app.use(errorHandler)

const __dirname = path.resolve()

if(process.env.NODE_ENV === 'production') {

  app.use(express.static(path.join(__dirname,'/frontend/build')))
 
  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname,'frontend','build','index.html')))
}
else {
  app.get('/', (req, res) => {
    console.log('app is running on port 6000 Aniket');
    res.send('server running on port 4000...')
    //res.json(products)
  })
  
}



const PORT = process.env.PORT || 5000

app.listen(PORT,console.log(`sever running in ${process.env.NODE_ENV} mode on  port ${PORT}`.yellow.bold))