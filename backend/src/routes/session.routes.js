import Router from 'express';
import { getSessionsController, logoutSessionController } from '../controller/session.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const sessionRouter = Router();

/**
    @routes Get /api/session/get-sessions
    @desc Get logged in user sessions
 */
sessionRouter.get('/get-sessions', authMiddleware, getSessionsController);

/**
    @routes POST /api/session/logout-session
    @desc Logout specific session
 */
sessionRouter.post('/logout-session/:id', authMiddleware, logoutSessionController);

export default sessionRouter;