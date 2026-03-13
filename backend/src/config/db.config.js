import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDb successfully.');
});

export default connectDB;