import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import authRouter from './routes/auth.route.js';
import songRouter from './routes/song.route.js';
import listeningHistoryRouter from './routes/listeningHistory.route.js';
import moodLogRouter from './routes/mood.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/history', listeningHistoryRouter);
app.use('/api/mood', moodLogRouter);

export default app;