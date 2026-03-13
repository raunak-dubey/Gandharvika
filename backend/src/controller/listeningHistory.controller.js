import listeningHistoryModel from '../models/listeningHistory.model.js';
import songModel from '../models/songs/song.model.js'
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';

/**
 @routes POST /api/history/play/:songId
 @desc Log play event
 */
export const playSong = asyncHandler(async (req, res) => {
    const { songId } = req.params;
    const { mood } = req.body;
    const userId = req.user.id;

    const song = await songModel.findById(songId);
    if (!song) {
        throw new ApiError(404, "Song not found");
    }


    await listeningHistoryModel.create({
        user: userId,
        song: songId,
        detectedMood: mood,
    });

    await songModel.findByIdAndUpdate(songId, { $inc: { playCount: 1 } });

    res.status(200).json({
        success: true,
        message: "Song played successfully",
    });
});

/**
 @routes GET /api/history
 @desc Get listening history
*/
export const getListeningHistory = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const history = await listeningHistoryModel.find({ user: userId })
        .populate("song")
        .sort({ createdAt: -1 })
        .limit(30);

    res.status(200).json({
        success: true,
        history
    });

});