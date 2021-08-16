import jwt from 'jsonwebtoken'

import AsyncHandler from 'express-async-handler'

import User from '../models/userModels.js'

const protect = AsyncHandler(async (req,res,next) => {


    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        //const decoded = jwt.verify(token)
        try {
            let token = req.headers.authorization.split(' ')[1]
            console.log(token)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            
            console.log(decoded,"Pleasesssssssssssssssss")

            req.user = await User.findById(decoded.id).select('-password')

            console.log(req.user,"Please.........................")
            next()

        } catch (error) {
            console.log(error)

            res.status(401)

            throw new Error('Not authorized, token failed')
        }
    }
    
    if(!token) {
        res.status(401)
        throw new Error('Not authorized')
    }


   
})

const admin = (req,res,next) => {
    if(req.user &&req.user.isAdmin)
    {
        next()
    }
    else
    {
        res.status(401)
        throw new Error('Not authorized as Admin')
    }
}
export { protect, admin}