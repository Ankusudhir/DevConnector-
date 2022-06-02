import express from 'express'

import Router from 'express'

import { getProducts, getProductById,createProductReview,getTopProducts,deleteProduct,createProduct,updateProduct} from '../controllers/productController.js'

import { protect,admin } from '../middleware/authMiddleware.js'

import  fileUpload from './fileUpload.js'

var router = express.Router()

//@description fetch all products
//@route GET /api/products
//@access Public

router.route('/').get(getProducts).post(protect,fileUpload.single('image'),createProduct)
  

//@description fetch single product
//@route GET /api/products/id
//@access Public
router.route('/:id').get(getProductById).delete(protect,admin,deleteProduct).put(protect,admin,updateProduct)


//@description fetch all top rated products
//@route GET /api/proucts/top
//@access Public

router.route('/top').get(getTopProducts)
  



  // @desc Create new review
  // @route POST /api/product/:id/reviews
  // access Private
  router.route('/:id/reviews').post(protect,createProductReview)
  


  


export default router;