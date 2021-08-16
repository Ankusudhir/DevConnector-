import asyncHandler from 'express-async-handler'


import Order from '../models/orderModel.js'

import Product from '../models/productModel.js'

//const Order = require('../models/orderModel')

// @desc create a new order
// @route POST/api/orders
// @access Private
const addOrderItems = asyncHandler(async (req,res) =>  {
    const {orderItems,itemsPrice,shippingAddress, paymentMethod, taxPrice, 
       ShippingPrice, totalPrice } = req.body

       console.log("ORDERITEMS",orderItems)

       //const userLogin = useSelector(state => state.userLogin)

       //const {loading, error,userInfo } = userLogin

      /* if(orderItems && orderItems.length === 0)
       {
           res.status(400)
           throw new Error('No orderitems')
           return
       }
       else {*/
          var date = new Date();
          const ord = new Order({

             
              orderItems,
              user: req.user._id,
              shippingAddress,
              paymentMethod,
              taxPrice,
              ShippingPrice,
              totalPrice,
              itemsPrice,
              paidAt: date,
              isPaid: false,

              //isDelivered,
          });
              //deliveredAt: date


         // });

           console.log("BCCCCnnnnnCCCCCCCCC",ord)

           const createdOrder = await ord.save()

           console.log("MCCCCCCCCCCCCC",createdOrder)

         res.status(201).json(createdOrder)
      // }
  })

  // @desc get order by id
// @route POST/api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req,res) =>  {
    const order = await Order.findById(req.params.id).populate('user','name')
      if(order) {
          res.json(order)
      }
      else {
          res.status(404)
          throw new Error('Order not found')
      }

})


  // @desc update order to paid
// @route GET/api/orders/:id/pay
// @access Private
const updateOrderToPaid = asyncHandler(async (req,res) =>  {
    const order = await Order.findById(req.params.id)
      if(order) {
          order.isPaid = true
          order.paidAt = Date.now()
          /*order.paymentResult = { // paypal result
              id: req.body.id,
              status : req.body.status,
              update_time: req.body.update_time,
              email_address: req.body.payer.email_address
          }*/

          const updatedOrder = await order.save()

          res.json(updatedOrder)
      }
      else {
          res.status(404)
          throw new Error('Order not found')
      }

})


 // @desc get logged in user orders
// @route GET/api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req,res) =>  {
    const orders = await Order.find({user: req.user._id})
     res.json(orders)
})

  export { addOrderItems,getOrderById,updateOrderToPaid,getMyOrders }
