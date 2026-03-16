import rateLimit from 'express-rate-limit';

// ? General Api Limit
export const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: 'Too many api requests, please try again after 15 minutes',
    standardHeaders: true,
    legacyHeaders: false,
});

// ? Auth Api Limit
export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50,
    message: 'Too many authentication requests. Please try again after 15 minutes',
});

// ? Login Api Limit
export const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10,
    // keyGenerator: (req) => req.ip + req.headers['user-agent'],
    message: 'Too many login requests. Please try again after 15 minutes',
});

// ? Register Api Limit
export const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: "Too many accounts created from this IP.",
});

// ? Refresh Api Limit
export const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many token refresh attempts.",
});