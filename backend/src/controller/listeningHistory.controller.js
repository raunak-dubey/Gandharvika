import listeningHistoryModel from '../models/listeningHistory.model.js';
import songModel from '../models/songs/song.model.js'

/**
 @routes POST /api/history/play/:songId
 @desc Log play event
 */
export const playSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const { mood } = req.body;
        const userId = req.user._id;

        const song = await songModel.findById(songId);
        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 @routes GET /api/history
 @desc Get listening history
*/
export const getListeningHistory = async (req, res) => {
    const userId = req.user._id
    try {
        const history = await listeningHistoryModel.find({ user: userId })
            .populate("song")
            .sort({ createdAt: -1 })
            .limit(30);

        res.status(200).json({
            success: true,
            history
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};