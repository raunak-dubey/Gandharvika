import jwt from 'jsonwebtoken';
import redis from '../config/cache.config.js'
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new ApiError(401, 'Access denied. No token provided.');
    }

    let isTokenBlacklisted = await redis.get(token);

    if (isTokenBlacklisted) {
        throw new ApiError(401, 'Access denied. Invalid Token.');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        throw new ApiError(401, 'Access denied. Invalid Token.');
    }
    req.user = decoded;
    next();
});

export default authMiddleware;