import sessionModel from "../models/session.model";
import asyncHandler from "../utils/asyncHandler";
import { NotFoundError } from "../utils/ApiError";

/**
    @routes Get /api/session/get-sessions
    @desc Get logged in user sessions
 */

export const getSessionsController = asyncHandler(async (req, res) => {
    const sessions = await sessionModel.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({
        success: true,
        message: 'Sessions fetched successfully.',
        sessions
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