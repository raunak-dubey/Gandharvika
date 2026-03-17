import asyncHandler from '../utils/asyncHandler.js';
import userModel from '../models/user.model.js'
import sessionModel from '../models/session.model.js'
import { NotFoundError, UnauthorizedError } from '../utils/ApiError.js'
import bcrypt from 'bcryptjs';

/**
    @routes Get /api/user/get-me
    @desc Get logged in user details.
 */
export const getMeController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId).select('-password');

    if (!user) {
        throw new NotFoundError('User not found.')
    }

    return res.status(200).json({
        success: true,
        message: 'User fetched successfully.',
        user: {
            id: user._id.toString(),
            username: user.username,
            email: user.email,
            avatar: user.avatar
        }
    });
});

/**
 * @routes Post /api/user/update
 * @desc Update user details
 */
export const updateUserController = asyncHandler(async (req, res) => {
    const { username, email, avatar } = req.body;
    const userId = req.user?.id;

    const exists = await userModel.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: userId }
    });

    if (exists) {
        throw new ConflictError('Username or email already exists.');
    }

    const user = await userModel.findByIdAndUpdate(userId,
        { username, email, avatar },
        { new: true, runValidators: true }
    );

    if (!user) {
        throw new NotFoundError('User not found.');
    }

    return res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        user
    });
});

/**
 * @routes POST /api/user/update-password
 * @desc Update user password
 */
export const updateUserPasswordController = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id;

    const user = await userModel.findById(userId).select('+password');

    if (!user || !(await user.comparePassword(oldPassword))) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    const updatedUser = await userModel.findByIdAndUpdate(userId,
        { password: hashedPassword },
    );

    return res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        user: updatedUser
    });
});

/**
 * @routes POST /api/user/delete
 * @desc delete user account
*/
export const deleteUserController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const user = await userModel.findByIdAndDelete(userId);
    await sessionModel.deleteMany({ userId: userId });

    if (!user) {
        throw new NotFoundError('User not found.');
    }

    return res.status(200).json({
        success: true,
        message: 'User deleted successfully.'
    })
});