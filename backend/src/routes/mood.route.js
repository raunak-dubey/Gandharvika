import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { getMoodLogs, logMood } from '../controller/mood.controller.js';

const moodRouter = Router();

/**
 @routes Post /api/mood/log
 @desc Log detected mood
 */
moodRouter.post('/log', authMiddleware, logMood);

/**
 @routes Get /api/mood/log
 @desc Get mood logs
 */
moodRouter.get('/log', authMiddleware, getMoodLogs);

export default moodRouter;