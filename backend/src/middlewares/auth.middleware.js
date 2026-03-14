import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import sessionModel from '../models/session.model.js';

const authMiddleware = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new UnauthorizedError("Access denied");
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
        throw new UnauthorizedError('Invalid or expired token');
    }

    const session = await sessionModel.findById(decoded.sessionId);
    if (!session || session.revoked) {
        throw new UnauthorizedError("Session expired");
    }

    req.user = {
        id: decoded.userId,
        sessionId: decoded.sessionId
    };
    next();
});

export default authMiddleware;