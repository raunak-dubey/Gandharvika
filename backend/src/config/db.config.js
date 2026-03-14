import mongoose from 'mongoose';
import asyncHandler from '../utils/asyncHandler.js';
import logger from '../utils/logger.js';
import { InternalServerError } from '../utils/ApiError.js';

if (!process.env.MONGO_URI) {
  throw new InternalServerError('MONGO_URI environment variable is not set');
}

const connectDB = asyncHandler(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    logger.info('Connected to MongoDb successfully.');
});

export default connectDB;