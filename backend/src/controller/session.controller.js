import sessionModel from "../models/session.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import { NotFoundError } from "../utils/ApiError.js";
import { UAParser } from 'ua-parser-js';
import { hashToken } from '../utils/token.js';

/**
    @routes Get /api/session/get-sessions
    @desc Get logged in user sessions
 */

export const getSessionsController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    const currentHash = refreshToken ? hashToken(refreshToken) : null;

    const sessions = await sessionModel.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const formatted = sessions.map((s) => {
        const parser = new UAParser(s.userAgent);
        const browser = parser.getBrowser();
        const os = parser.getOS();

        return {
            _id: s._id,
            device: `${browser.name || "Unknown"} - ${os.name || "Unknown"}`,
            createdAt: s.createdAt,
            active: !s.revoked,
            current: currentHash && s.refreshTokenHash === currentHash,
        }
    });

    return res.status(200).json({
        success: true,
        message: 'Sessions fetched successfully.',
        sessions: formatted
    })
});

/**
    @routes POST /api/session/logout-session
    @desc Logout specific session
 */
export const logoutSessionController = asyncHandler(async (req, res) => {
    const sessionId = req.params.id;

    const session = await sessionModel.findOneAndUpdate({ _id: sessionId, userId: req.user.id }, { $set: { revoked: true } });
    if (!session) {
        throw new NotFoundError('Session not found.');
    }

    return res.status(200).json({
        success: true,
        message: 'Session revoked successfully.'
    })
});