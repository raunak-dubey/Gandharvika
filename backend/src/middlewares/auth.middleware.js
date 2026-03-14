import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { getCache } from '../utils/cache.js';
import crypto from 'crypto';

const authMiddleware = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        throw new UnauthorizedError('Access denied. No token provided.');
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        throw new UnauthorizedError('Access denied. Invalid Token.');
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    let isTokenBlacklisted = await getCache(`blacklist:${tokenHash}`);

    if (isTokenBlacklisted) {
        throw new UnauthorizedError('Access denied. Invalid Token.');
    }

    req.user = decoded;
    next();
});

export default authMiddleware;