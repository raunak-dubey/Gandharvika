import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required.'],
        trim: true,
        lowercase: true,
        match: [/^(?=.{6,30}$)[a-zA-Z][a-zA-Z0-9._]*$/, 'Username must contain only alphanumeric characters.']
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please enter a valid email address.']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        select: false,
        minlength: [8, 'Password must be at least 8 characters long.'],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character.']
    },
    avatar: {
        type: String,
        default: 'https://ik.imagekit.io/skietn14x/default_avatar.png?updatedAt=1770897539718',
        trim: true
    }
}, { timestamps: true })

userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: 1 }, { unique: true });

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

const userModel = mongoose.model('User', userSchema);
export default userModel;