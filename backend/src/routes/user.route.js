import Router from 'express';
import { getMeController } from '../controller/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';

const userRouter = Router();

/**
 * @routes Get /api/user/get-me
 * @desc Get logged in user details.
 */
userRouter.get('/get-me', authMiddleware, getMeController);

/**
 * @routes POST /api/user/update
 * @desc Update user details
 */
userRouter.put('/update', authMiddleware, updateUserController);

/**
 * @routes POST /api/user/update-password
 * @desc Update user password
 */
userRouter.put('/update-password', authMiddleware, updateUserPasswordController);

/**
 * @routes POST /api/user/delete
 * @desc delete user account
 */
userRouter.delete('/delete', authMiddleware, deleteUserController);

export default userRouter;