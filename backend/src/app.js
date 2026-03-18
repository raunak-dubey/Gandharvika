// ? Core Imports
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser'

// ? Security Imports
import helmet from 'helmet';
import { apiLimiter, authLimiter } from './middlewares/rateLimiter.middleware.js';

// ? Logging Imports
import pinoHttp from 'pino-http';
import logger from './utils/logger.js';

// ? Routes Imports
import authRouter from './routes/auth.route.js';
import songRouter from './routes/song.route.js';
import listeningHistoryRouter from './routes/listeningHistory.route.js';
import moodLogRouter from './routes/mood.route.js';
import userRouter from './routes/user.route.js';
import sessionRouter from './routes/session.routes.js';

// ? Error Handling Imports
import errorHandler from './middlewares/errorHandler.middleware.js';

const app = express();

// ? Core middlewares
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// ? Security middlewares
app.use(helmet());
app.use('/api', apiLimiter);

// ? Logging middleware
app.use(pinoHttp({
    logger,
    customLogLevel: (res, err) => {
        if (err || res.statusCode >= 500) return "error";
        if (res.statusCode >= 400) return "warn";
        return "info";
    }
}));

// ? Routes
app.use('/api/auth', authLimiter, authRouter);
app.use('/api/song', songRouter);
app.use('/api/history', listeningHistoryRouter);
app.use('/api/mood', moodLogRouter);
app.use('/api/user', userRouter)
app.use('/api/session', sessionRouter)

// ? Global Error handler
app.use(errorHandler)

export default app;