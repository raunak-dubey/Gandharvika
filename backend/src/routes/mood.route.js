import { Router } from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { logMood } from '../controller/mood.controller.js';

const moodRouter = Router();

/**
 @routes Post /api/mood/log
 @desc Log detected mood
 */
moodRouter.post('/log', authMiddleware, logMood);

export default moodRouter;