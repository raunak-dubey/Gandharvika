import moodLogModel from '../models/moodLog.model.js';
import { BadRequestError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 @routes Post /api/mood/log
 @desc Log detected mood
 */
export const logMood = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { mood, confidence } = req.body;
  if (!mood) {
    throw new BadRequestError("Mood is required");
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

/**
 @routes Get /api/mood/log
 @desc Get mood logs
 */
export const getMoodLogs = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const logs = await moodLogModel.find({ user: userId })
    .sort({ createdAt: -1 })
    .limit(30)
    .lean();

  res.status(200).json({
    success: true,
    logs
  });
});