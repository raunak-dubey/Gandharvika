import Router from 'express';
import { deleteUserController, getMeController, logoutAllController, logoutUserController, updateUserController, updateUserPasswordController } from '../controller/user.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js'

const userRouter = Router();

/**
 * @routes Get /api/user/get-me
 * @desc Get logged in user details.
 */
userRouter.get('/get-me', authMiddleware, getMeController);

/**
 @routes POST /api/user/update
 @desc Update user details
 */
userRouter.put('/update', authMiddleware, upload.single('avatar'), updateUserController);

/**
 @routes POST /api/user/update-password
 @desc Update user password
 */
userRouter.put('/update-password', authMiddleware, updateUserPasswordController);

/**
 @routes POST /api/user/delete
 @desc delete user account
 */
userRouter.delete('/delete', authMiddleware, deleteUserController);

/**
    @routes Post /api/user/logout
    @desc Logout a user
 */
userRouter.post('/logout', logoutUserController);

/**
    @routes Post /api/user/logout-all
    @desc Logout a user from all devices
 */
userRouter.post('/logout-all', authMiddleware, logoutAllController);

export default userRouter;