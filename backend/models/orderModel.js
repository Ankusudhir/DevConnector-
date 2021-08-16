import mongoose from 'mongoose'

import User from './userModels.js';

import Product from './productModel.js';

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {type: String},
            qty: {type: Number, required: true},
            image: {type: String, required: true},
            price: {type: Number, required: true},
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shippingAddress: {
        address: { type: String, required: true },
        city: {type: String, required: true},
        postalCode: {type: String, required: true },
        country: {type: String,required: true}
    },
    paymentMethod: {
        type: String,
        required: true
    },
    
    taxPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    ShippingPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice: {
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt: {
        type: Date,
        required: true
    },
    isPaid: {
        type: Boolean,
        deafault: false,
        required: true
    },
    isDelivered: {
        type: Boolean,
        required: true,
        default: false
    },
    deliveredAt: {
        type: Date,
    },
    
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema)

export default Order