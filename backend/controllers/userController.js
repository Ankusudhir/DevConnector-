
import asyncHandler from 'express-async-handler'

//@desc auth user and get Token
// @route POST /api/users/login
//@access Public
import User from '../models/userModels.js'

import generateToken from '../utils/generateToken.js'

const authUser = asyncHandler(async (req,res) =>  {

    const { email, password } = req.body

    const user = await User.findOne ({ email })

    if(user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(401).json({error: 'Password is InCorrect'})

    }
})

// @desc Register a new user
//@route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req,res) =>  {

    const { name, email, password } = req.body

    const userExist = await User.findOne ({ email })

    if(userExist)
    {
        res.status(400)
        throw new Error('User already exist')
    }

    const user = await User.create({
        name,
        email,
        password
    })

    if(user)
    {
        res.status(201).json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    }
    else {
        res.status(400)
        throw new Error('Inavalid User Data')
    }
})
//@desc get user profile
// @route GET /api/users/profile
//@access Private
const getUserProfile = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})

    const user = req.user

    if(user)
    {
        res.json({
            _id: user._id,
            name:user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    }
    else {
        res.status(404)
        throw new Error('User not found')
    }
})

//@desc get all users
// @route DELETE /api/users/:ID
//@access Private/admin
const deleteUser = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})
    const user = await User.findById(req.params.id)

    if(user)
    {
        await user.delete()
        res.send('User deleted')
    }
    else
    {
        res.json(404)
        throw new Error('User not found')
    }
    res.json(users)
})

//@desc delete the user
// @route GET /api/users
//@access Private/admin
const getUsers = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})
    const users = await User.find({})
    res.json(users)
})

//@desc update user profile
// @route GET /api/users/profile
//@access Private
const updateUserProfile = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})

    const user = await User.findById(req.user._id)

    if(user)
    {
        user.name = req.body.name || user.name

        user.email = req.body.email || user.email

        if(req.body.password) 
        {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id)
        })
    }
    else
    {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc Get user by Id
//@route GET /api/user/:id
//@access Private/Admin

const getUserById = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})
    const user = await User.findById(req.params.id).select('-password')

    if(user)
    res.json(user)
    else{
        res.status(404)
        throw new Error('User not found')
    }
   
})


//@desc update user profile
// @route GET /api/users/:id
//@access Private/admin
const updateUser = asyncHandler(async(req,res) =>  {
    //res.json({success:'Success',user: req.user})

    const user = await User.findById(req.params.id)

    if(user)
    {
        user.name = req.body.name || user.name

        user.email = req.body.email || user.email

        user.isAdmin = req.body.isAdmin
        

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            name:updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        })
    }
    else
    {
        res.status(404)
        throw new Error('User not found')
    }
})

export { authUser,getUserProfile,registerUser,deleteUser,updateUserProfile,getUsers,getUserById,updateUser}

