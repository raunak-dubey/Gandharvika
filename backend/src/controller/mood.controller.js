import moodLogModel from '../models/moodLog.model.js';

/**
 @routes Post /api/mood/log
 @desc Log detected mood
 */
export const logMood = async (req, res) => {
    const userId = req.user._id
  try {
    const { mood, confidence } = req.body;
    if (!mood) {
      return res.status(400).json({
        success: false,
        message: "Mood required"
      });
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

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};