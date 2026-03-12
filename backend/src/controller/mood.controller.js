import moodLogModel from '../models/moodLog.model.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 @routes Post /api/mood/log
 @desc Log detected mood
 */
export const logMood = asyncHandler(async (req, res) => {
  const userId = req.user._id
  const { mood, confidence } = req.body;
  if (!mood) {
    throw new ApiError(400, "Mood is required");
  }

  const log = await moodLogModel.create({
    user: userId,
    detectedMood: mood,
    confidence
  });

  res.status(201).json({
    success: true,
    log
  });
});