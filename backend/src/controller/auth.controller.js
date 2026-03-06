import userModel from '../models/user.model.js';
import bcrypt from 'bcryptjs'
import generateToken from '../utils/generateToken.js'
import redis from '../config/cache.config.js';

/**
 @routes POST /api/auth/register
 @desc Register a new user to database
 */
export const registerUserController = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, Email and Password are required to register'
            });
        }

        const isUserAlreadyExists = await userModel.findOne({
            $or: [{ username }, { email }]
        })

        if (isUserAlreadyExists) {
            return res.status(409).json({
                success: false,
                message: `An account is already registered with this ${isUserAlreadyExists.email === email ? 'Email' : 'Username'}`
            })
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
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Registration failed. An internal server error occurred'
        })
    }
}

/**
 @routes POST /api/auth/login
 @desc Login a user
 */
export const loginUserController = async (req, res) => {
    try {
        const { identifier, password } = req.body;

        if (!identifier || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username/Email and Password are required to login'
            });
        }

        const user = await userModel.findOne({
            $or: [
                { username: identifier }, { email: identifier }
            ]
        }).select('+password')

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials. Please try again.'
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid Credentials. Please try again.'
            })
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

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Login failed. An internal server error occurred'
        })
    }
}

/**
 @routes Get /api/auth/get-me
 @desc Get logged in user details.
 */
export const getMeController = async (req, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized.'
            });
        }

        const user = await userModel.findById(userId).select('-password')

        if (!user) {
            res.clearCookie('token');
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User fetched successfully.',
            user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch user.'
        });
    }
};

/**
 @routes Get /api/auth/logout
 @desc logout a user
 */
export const logoutUserController = async (req, res) => {
    try {
        const token = req.cookies?.token;

        res.clearCookie('token');

        await redis.set(token, Date.now().toString(), "EX", 3 * 24 * 60 * 60);

        return res.status(200).json({
            success: true,
            message: 'Logout successfully.'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Logout failed. An internal server error occurred'
        })
    }
}