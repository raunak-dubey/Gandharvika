import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import {
    USERNAME_REGEX,
    EMAIL_REGEX,
    PASSWORD_REGEX
} from '../../../shared/constants/validation.js';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [USERNAME_REGEX, 'Username must be 3-30 characters and only contain letters, numbers and underscores.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        unique: true,
        match: [EMAIL_REGEX, 'Email must be a valid email.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        match: [PASSWORD_REGEX, 'Password must be at least 8 characters, one uppercase, one lowercase, one number and one special character.']
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png?updatedAt=1770897539718',
        trim: true
    },
    avatarFileId: {
        type: String,
        trim: true
    }
}, { timestamps: true })

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// ? Remove sensitive data from response
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const userModel = mongoose.model('User', userSchema);
export default userModel;