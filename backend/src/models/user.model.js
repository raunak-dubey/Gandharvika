import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'This username is already exists.'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'This email is already exists.'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        trim: true,
        minlength: [8, 'Password must be at least 8 characters long.']
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png?updatedAt=1770897539718',
        trim: true
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);
export default userModel;