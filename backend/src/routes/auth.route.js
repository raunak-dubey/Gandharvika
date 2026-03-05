import Router from 'express';
import { registerUserController, loginUserController, getMeController, logoutUserController } from '../controller/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const authRouter = Router();

/**
 @routes POST /api/auth/register
 @desc Register a new user to database
 */
authRouter.post('/register', registerUserController);

/**
 @routes POST /api/auth/login
 @desc Login a user
 */
authRouter.post('/login', loginUserController);

/**
 @routes Get /api/auth/get-me
 @desc Get logged in user details.
 */
authRouter.get('/get-me', authMiddleware, getMeController);

/**
 @routes Get /api/auth/logout
 @desc Logout a user
 */
authRouter.post('/logout', authMiddleware, logoutUserController);
