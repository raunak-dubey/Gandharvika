import Router from 'express';
import { registerUserController, loginUserController, refreshUserController } from '../controller/auth.controller.js';
import { loginUserValidator, registerUserValidator } from '../middlewares/validators/auth.validator.js';
import { validate } from '../middlewares/validator.middleware.js';
import { loginLimiter, refreshLimiter, registerLimiter } from '../middlewares/rateLimiter.middleware.js';

const authRouter = Router();

/**
    @routes POST /api/auth/register
    @desc Register a new user to database
 */
authRouter.post('/register', registerLimiter, registerUserValidator, validate, registerUserController);

/**
    @routes POST /api/auth/login
    @desc Login a user
 */
authRouter.post('/login', loginLimiter, loginUserValidator, validate, loginUserController);

/**
    @routes Post /api/auth/refresh
    @desc Generate a new access token
 */
authRouter.post('/refresh', refreshLimiter, refreshUserController);

export default authRouter;