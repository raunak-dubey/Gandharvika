import mongoose from 'mongoose';
import listeningHistoryModel from '../models/listeningHistory.model.js';
import songModel from '../models/songs/song.model.js'
import { NotFoundError } from '../utils/ApiError.js';
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
        throw new NotFoundError("Song not found");
    }

    await Promise.all([
        listeningHistoryModel.create({
            user: userId,
            song: songId,
            detectedMood: mood,
        }),

        songModel.updateOne({ _id: songId }, { $inc: { playCount: 1 } })
    ]);

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
    const userId = new mongoose.Types.ObjectId(req.user.id);

    const history = await listeningHistoryModel.aggregate([
        { $match: { user: userId } },
        { $sort: { createdAt: -1 } },
        {
            $group: {
                _id: "$song",
                lastPlayed: { $first: "$createdAt" },
                detectedMood: { $first: "$detectedMood" },
            }
        },
        { $sort: { lastPlayed: -1 } },
        { $limit: 30 },

        {
            $lookup: {
                from: "songs",
                localField: "_id",
                foreignField: "_id",
                as: "song"
            }
        },
        { $unwind: "$song" }
    ]);

    res.status(200).json({
        success: true,
        history
    });

});