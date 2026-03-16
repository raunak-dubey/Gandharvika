import userModel from '../models/user.model.js';
import sessionModel from '../models/session.model.js';

import { generateAccessToken, generateRefreshToken, hashToken } from '../utils/token.js'
import { refreshTokenCookieOptions } from '../utils/cookies.js';

import { ConflictError, NotFoundError, UnauthorizedError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

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

    const refreshToken = generateRefreshToken(user._id);

    const session = await sessionModel.create({
        userId: user._id,
        refreshTokenHash: hashToken(refreshToken),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
    })
    const accessToken = generateAccessToken(session.userId, session._id);

    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.status(201).json({
        success: true,
        message: 'User registered successfully.',
        accessToken,
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
        $or: [ { username: identifier }, { email: identifier } ]
    }).select('+password');

    if (!user || !(await user.comparePassword(password))) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
    }

    const refreshToken = generateRefreshToken(user._id);

    const session = await sessionModel.create({
        userId: user._id,
        refreshTokenHash: hashToken(refreshToken),
        ip: req.ip,
        userAgent: req.headers['user-agent'],
    })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    const accessToken = generateAccessToken(session.userId, session._id);
    res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);

    return res.status(200).json({
        success: true,
        message: 'User logged in successfully.',
        accessToken
    })
});

/**
 @routes Get /api/auth/get-me
 @desc Get logged in user details.
 */
export const getMeController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
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
 @routes Get /api/auth/refresh
 @desc Generate a new access token
 */
export const refreshUserController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
        throw new UnauthorizedError('Refresh token is required.')
    }

    const session = await sessionModel.findOne({ refreshTokenHash: hashToken(refreshToken), revoked: false })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    const newRefreshToken = generateRefreshToken(session.userId)
    session.refreshTokenHash = hashToken(newRefreshToken)
    await session.save();

    const accessToken = generateAccessToken(session.userId, session._id)
    res.cookie('refreshToken', newRefreshToken, refreshTokenCookieOptions)

    return res.status(200).json({
        success: true,
        message: 'User refreshed successfully.',
        accessToken
    })
});

/**
 @routes Get /api/auth/logout
 @desc logout a user
 */
export const logoutUserController = asyncHandler(async (req, res) => {
    const refressToken = req.cookies?.refreshToken;
    if (!refressToken) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
    }

    const session = await sessionModel.updateOne({ refreshTokenHash: hashToken(refressToken), revoked: false }, { $set: { revoked: true } })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout successfully.'
    })
});

/**
 @routes Post /api/auth/logout-all
 @desc Logout a user from all devices
 */
export const logoutAllController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
    }

    const session = await sessionModel.updateMany({ userId: req.user.id, revoked: false }, { $set: { revoked: true } })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout from all devices successfully.'
    })
});