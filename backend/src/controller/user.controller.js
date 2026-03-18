import asyncHandler from '../utils/asyncHandler.js';
import userModel from '../models/user.model.js'
import sessionModel from '../models/session.model.js'
import { BadRequestError, ConflictError, InternalServerError, NotFoundError, UnauthorizedError } from '../utils/ApiError.js'
import bcrypt from 'bcryptjs';
import { uploadFile, deleteFile } from '../services/storage.service.js';
import { hashToken } from '../utils/token.js';

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
 @routes PUT /api/user/update
 @desc Update user details
 */
export const updateUserController = asyncHandler(async (req, res) => {
    const { username, email } = req.body;
    const userId = req.user?.id;

    const user = await userModel.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found.');
    }

    const exists = await userModel.findOne({
        $or: [{ username }, { email }],
        _id: { $ne: userId }
    });

    if (exists) {
        throw new ConflictError('Username or email already exists.');
    }

    let avatarUrl = user.avatar;
    let avatarFileId = user.avatarFileId;

    if (req.file) {
        const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
        if (!allowedTypes.includes(req.file.mimetype)) {
            throw new BadRequestError("Only JPG, PNG or WEBP images allowed.");
        }

        const avatarBuffer = req.file.buffer;

        const [avatarFile] = await Promise.all([
            uploadFile({
                buffer: avatarBuffer,
                fileName: `avatar-${userId}-${Date.now()}`,
                folder: "/Gandharvika/avatar"
            }),
        ]);

        // Delete old avatar from storage
        if (avatarFileId) {
            try {
                await deleteFile({
                    fileId: user.avatarFileId,
                    folder: "/Gandharvika/avatar"
                })
            } catch (e) {
                throw new InternalServerError("Failed to delete old avatar file.");
            }
        }
        avatarUrl = avatarFile.url;
        avatarFileId = avatarFile.fileId;
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId,
        { username, email, avatar: avatarUrl, avatarFileId },
        { new: true, runValidators: true }
    );

    return res.status(200).json({
        success: true,
        message: 'User updated successfully.',
        user: updatedUser
    });
});

/**
 @routes PUT /api/user/update-password
 @desc Update user password
 */
export const updateUserPasswordController = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const userId = req.user?.id;

    const user = await userModel.findById(userId).select('+password');

    if (!user || !(await user.comparePassword(oldPassword))) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.');
    }

    user.password = newPassword;
    await user.save()

    return res.status(200).json({
        success: true,
        message: 'Password updated successfully.',
    });
});

/**
 @routes DELETE /api/user/delete
 @desc delete user account
*/
export const deleteUserController = asyncHandler(async (req, res) => {
    const userId = req.user?.id;
    const user = await userModel.findById(userId);

    if (!user) {
        throw new NotFoundError('User not found.');
    }

    // Delete avatar if exisD /ats
    if (user.avatarFileId) {
        await deleteFile({ fileId: user.avatarFileId })
    }

    await sessionModel.deleteMany({ userId: userId });
    await user.deleteOne()

    return res.status(200).json({
        success: true,
        message: 'User deleted successfully.'
    })
});

/**
    @routes Get /api/user/logout
    @desc logout a user
 */
export const logoutUserController = asyncHandler(async (req, res) => {
    const refressToken = req.cookies?.refreshToken;
    if (!refressToken) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
    }

    const session = await sessionModel.updateOne({ refreshTokenHash: hashToken(refressToken), revoked: false }, { $set: { revoked: true } })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout successfully.'
    })
});

/**
 @routes Post /api/user/logout-all
 @desc Logout a user from all devices
 */
export const logoutAllController = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
        throw new UnauthorizedError('Invalid Credentials. Please try again.')
    }

    const session = await sessionModel.updateMany({ userId: req.user.id, revoked: false }, { $set: { revoked: true } })
    if (!session) {
        throw new UnauthorizedError('Invalid Session. Please try again.')
    }

    res.clearCookie('refreshToken');
    return res.status(200).json({
        success: true,
        message: 'Logout from all devices successfully.'
    })
});