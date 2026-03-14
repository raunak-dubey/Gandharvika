import jwt from 'jsonwebtoken';
import crypto from 'crypto';

export const generateAccessToken = ( userId, sessionId ) => {
    return jwt.sign({ id: userId, sessionId: sessionId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '10m' });
}

export const generateRefreshToken = ( userId ) => {
    return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
}

export const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");