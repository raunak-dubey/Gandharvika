import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Connected to MongoDb successfully.');
});

export default connectDB;