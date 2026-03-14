// ? Core Imports
import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';

// ? Security Imports
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';

// ? Logging Imports
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';

// ? Routes Imports
import authRouter from './routes/auth.route.js';
import songRouter from './routes/song.route.js';
import listeningHistoryRouter from './routes/listeningHistory.route.js';
import moodLogRouter from './routes/mood.route.js';

// ? Error Handling Imports
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();

// ? Security middlewares
app.use(helmet());
app.use(mongoSanitize());

// ? Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message:
        'Too many requests from this IP, please try again after 15 minutes',
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use('/api', limiter);

// ? Logging middleware
app.use(pinoHttp({
    logger,
    customLogLevel: (res, err) => {
        if (err || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    }
}));

// ? Core middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// ? Routes
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/history', listeningHistoryRouter);
app.use('/api/mood', moodLogRouter);

// ? Global Error handler
app.use(errorHandler)

export default app;