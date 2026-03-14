import Router from 'express';
import { registerUserController, loginUserController, getMeController, logoutUserController, refreshUserController, logoutAllController } from '../controller/auth.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import { loginUserValidator, registerUserValidator } from '../middlewares/validators/auth.validator.js';
import { validate } from '../middlewares/validator.middleware.js';

const authRouter = Router();

/**
 @routes POST /api/auth/register
 @desc Register a new user to database
 */
authRouter.post('/register', registerUserValidator, validate, registerUserController);

/**
 @routes POST /api/auth/login
 @desc Login a user
 */
authRouter.post('/login', loginUserValidator, validate, loginUserController);

/**
 @routes Get /api/auth/get-me
 @desc Get logged in user details.
 */
authRouter.get('/get-me', authMiddleware, getMeController);

/**
 @routes Post /api/auth/refresh
 @desc Generate a new access token
 */
authRouter.post('/refresh', refreshUserController);

/**
 @routes Post /api/auth/logout
 @desc Logout a user
 */
authRouter.post('/logout', logoutUserController);

/**
 @routes Post /api/auth/logout-all
 @desc Logout a user from all devices
 */
authRouter.post('/logout-all', authMiddleware, logoutAllController);

export default authRouter;