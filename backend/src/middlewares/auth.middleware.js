import jwt from 'jsonwebtoken';
import redis from '../config/cache.config.js'

const authMiddleware = async (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Access denied. No token provided.'
        })
    }

    let isTokenBlacklisted;

    try {
        isTokenBlacklisted = await redis.get(token);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication service unavailable."
        });
    }

    if (isTokenBlacklisted) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token.'
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token.'
        });
    }
}

export default authMiddleware;