import userModel from '../models/user.model.js';
import generateToken from '../utils/generateToken.js'
import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { setCache } from '../utils/cache.js';
import crypto from 'crypto';

/**
 @routes POST /api/auth/register
 @desc Register a new user to database
 */
export const registerUserController = asyncHandler(async (req, res) => {
    const { username, email, password, avatar } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        $or: [{ username }, { email }]
    }).lean();

    if (isUserAlreadyExists) {
        throw new ConflictError(`An account is already registered with this ${isUserAlreadyExists.email === email ? 'Email' : 'Username'}`)
    }

    const user = await userModel.create({
        username,
        email,
        password,
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
        user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
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

    if (!user || !(await user.comparePassword(password))) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
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
        throw new UnauthorizedError('Unauthorized')
    }

    const user = await userModel.findById(userId).select('-password')

    if (!user) {
        res.clearCookie('token');
        throw new NotFoundError('User not found.')
    }

    return res.status(200).json({
        success: true,
        message: 'User fetched successfully.',
        user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
});

/**
 @routes Get /api/auth/logout
 @desc logout a user
 */
export const logoutUserController = asyncHandler(async (req, res) => {
    const token = req.cookies?.token;

    res.clearCookie('token');

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const key = `blacklist:${tokenHash}`;
    await setCache(key, '1', 3 * 24 * 60 * 60);

    return res.status(200).json({
        success: true,
        message: 'Logout successfully.'
    })
});