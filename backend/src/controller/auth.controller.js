import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import redis from '../config/cache.config.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 @routes POST /api/auth/register
 @desc Register a new user to database
 */
export const registerUserController = asyncHandler(async (req, res) => {
    const { username, email, password, avatar } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (isUserAlreadyExists) {
        throw new ApiError(409, `An account is already registered with this ${isUserAlreadyExists.email === email ? 'Email' : 'Username'}`)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        avatar
    })

    const token = generateToken(user._id);
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 day
    })

    return res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        user
    })
})

/**
 @routes POST /api/auth/login
 @desc Login a user
 */
export const loginUserController = asyncHandler(async (req, res) => {
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: identifier }, { email: identifier }
        ]
    }).select('+password')

    if (!user) {
        throw new ApiError(401, 'Invalid Credentials. Please try again.')
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
        throw new ApiError(401, 'Invalid Credentials. Please try again.')
    }

    const token = generateToken(user._id)
    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 3 * 24 * 60 * 60 * 1000 // 3 day
    })

    return res.status(200).json({
        success: true,
        message: 'User logged in successfully.'
    })
});

/**
 @routes Get /api/auth/get-me
 @desc Get logged in user details.
 */
export const getMeController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        throw new ApiError(401, 'Unauthorized')
    }

    const user = await userModel.findById(userId).select('-password')

    if (!user) {
        res.clearCookie('token');
        throw new ApiError(404, 'User not found.')
    }

    return res.status(200).json({
        success: true,
        message: 'User fetched successfully.',
        user
    });
});

/**
 @routes Get /api/auth/logout
 @desc logout a user
 */
export const logoutUserController = asyncHandler(async (req, res) => {
    const token = req.cookies?.token;

    res.clearCookie('token');

    await redis.set(token, Date.now().toString(), "EX", 3 * 24 * 60 * 60);

    return res.status(200).json({
        success: true,
        message: 'Logout successfully.'
    })
});