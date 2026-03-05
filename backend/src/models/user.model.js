import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        unique: [true, 'This username is already exists.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: [true, 'This email is already exists.'],
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png?updatedAt=1770897539718'
    }
}, { timestamps: true })

const userModel = mongoose.model('User', userSchema);
export default userModel;