import asyncHandler from 'express-async-handler'
import products from '../data/products.js'

import Product from '../models/productModel.js'

import multer from 'multer'

const getProducts = asyncHandler(async (req,res) =>  {
    
  

  //const pageSize = 1

  //const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword ? {

    
    name: {
      $regex: req.query.keyword,
      $options: 'i',
    },
  } : {}

  const count = await Product.countDocuments({...keyword})

  const products = await Product.find({...keyword})

  //pages = Math.ceil(count/pageSize)

    console.log(products)

    res.json({products})
  })

const getProductById = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product) {

       console.log(product,"vjavkhVCKHSDVKHFVEWJFVUK")

        res.json(product)
    }
    else {
       res.status(404).json({message: 'Product not found'})
    }
  })

  // @desc Delete product by id
  //@route DELETE /api/products/:id
  //@access Private admin
  const deleteProduct = asyncHandler(async (req,res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        await product.remove()
        res.json({message : 'Product removed'})
    }
    else {
       res.status(404).json({message: 'Product not found'})
    }
  })

  // @desc createnew product
  //@route POST /api/products/:id
  //@access public
  const createProduct = asyncHandler(async (req,res) => {

 


    const {name,price,description,image,brand,category,countInStock} = req.body

    
    const product = new Product({
      name: name,
      price: price,
      user: req.user._id,
      image : image,
      brand: brand,
      category: category,
      countInStock: countInStock,
      numReviews: 0,  
      description: description
    })

    console.log("product will be added",product)
    const createdproduct  = await product.save()

    res.status(201).json(createdproduct)
  })
 

  // @desc update product
  //@route PUT /api/products/:id
  //@access PRIVATE /ADMIN
  const updateProduct = asyncHandler(async (req,res) => {

    const {name,price,description,image,brand,category,countInStock} = req.body

    const product = await Product.findById(req.params.id)

    if(product) {

      product.name = name
      product.price = price
      product.description = description
      product.image = image
      product.brand = brand
      product.category = category
      product.countInStock = countInStock
      const updatedproduct  = await product.save()

      res.status(201).json(updatedproduct)
    }
    else{
      res.status(404)
      throw new Error('Product not found')
    }
  })


  // @desc Create new review
  // @route POST /api/product/:id/reviews
  // access Private

  const createProductReview = asyncHandler(async(req,res) => {

    const {
      rating,
      comment
    } = req.body

    const product = await Product.findById(req.params.id)

    if(product) {
      const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString())

      if(alreadyReviewed)
      {
        res.status(400)

        throw new Error('Product already reviewed')
      }

      const review = {
        name: req.user.name,
        rating: Number(rating),
        user: req.user._id,
        comment: comment
      }


      product.reviews.push(review)

      product.numReviews = product.reviews.length

      product.rating = product.reviews.reduce((acc,item) => item.rating + acc,0)/product.reviews.length

      await product.save()
      res.status(201).json({message: 'Review added'})
    } else {
      res.status(404)
      throw new Error('Product not found')
    }

  })

// @desc create new review
  // @route POST /api/products/:id/reviews
  // access PRIVATE

  const getTopProducts = asyncHandler(async(req,res) => {

    const products = await Product.find({ }).sort({rating: -1}).limit(3)

    res.json(products)
    
  })



  export {getProducts,getProductById,createProductReview,getTopProducts,deleteProduct,updateProduct,createProduct}
