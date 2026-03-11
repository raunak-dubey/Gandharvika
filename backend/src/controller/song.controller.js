import id3 from 'node-id3';
import { parseBuffer } from 'music-metadata';
import uploadFile from '../services/storage.service.js';
import songModel from '../models/songs/song.model.js';
import songLikeModel from '../models/songs/songLike.model.js';
import listeningHistoryModel from '../models/listeningHistory.model.js';

/**
 @routes POST /api/song/
 @desc Upload a song.
 */
export const uploadSong = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        const songBuffer = req.file.buffer;
        const { mood, tags } = req.body;

        const id3Tags = id3.read(songBuffer);
        const parsedTags = await parseBuffer(songBuffer);

        const duration = Math.round(parsedTags.format.duration || 0);

        if (!id3Tags.title || !id3Tags.artist) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID3 metadata"
            });
        }

        const exists = await songModel.findOne({
            title: id3Tags.title,
            artist: id3Tags.artist
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Song already exists"
            });
        }

        // ? Upload song to storage
        const [songFile, thumbnailFile] = await Promise.all([
            uploadFile({
                buffer: songBuffer,
                fileName: id3Tags.title + '.mp3',
                folder: "/Gandharvika/songs"
            }),
            id3Tags.image
                ? uploadFile({
                    buffer: id3Tags.image.imageBuffer,
                    fileName: (id3Tags.title || "song") + ".jpeg",
                    folder: "/Gandharvika/thumbnail"
                })
                : null
        ]);

        const song = await songModel.create({
            title: id3Tags.title,
            artist: id3Tags.artist,
            album: id3Tags.album,
            mood,
            audioUrl: songFile.url,
            thumbnail: thumbnailFile?.url,
            duration,
            tags: tags ? tags.split(",").map(t => t.trim()) : [],
            uploadedBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Song uploaded successfully",
            song
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 @routes Get /api/song/
 @desc get all songs.
 */
export const getSongs = async (req, res) => {
    try {
        const { mood } = req.query;

        const filter = mood ? { mood } : {};
        const songs = await songModel.find(filter).sort({ playCount: -1 }).limit(10);

        res.status(200).json({
            success: true,
            message: "Songs fetched successfully",
            songs
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

/**
 @routes GET /api/song/recommend
 @desc get mood based recommendations
 */
export const getRecommendedSongs = async (req, res) => {
    try {
        const { mood } = req.query;
        const userId = req.user.id;

        if (!mood) {
            return res.status(400).json({
                success: false,
                message: "Mood is required"
            });
        }

        const [moodSongs, likedSongs, popular, historySongs] = await Promise.all([
            songModel.find({ mood }).sort({ playCount: -1 }).limit(10),
            songLikeModel.find({ user: userId }).populate("song").limit(5),
            songModel.find().sort({ playCount: -1 }).limit(5),
            listeningHistoryModel.find({ user: userId }).populate("song").limit(20),
        ]);

        const tags = historySongs.flatMap(h => h.song?.tags || []);
        const tagSongs = await songModel.find({
            tags: { $in: tags }
        }).limit(10);

        const recommendations = [
            ...moodSongs,
            ...likedSongs.map(l => l.song),
            ...historySongs.map(h => h.song),
            ...tagSongs,
            ...popular
        ];

        const uniqueSongs = Array.from(
            new Map(recommendations.map(s => [s._id.toString(), s])).values()
        );

        res.status(200).json({
            success: true,
            message: "Songs fetched successfully",
            songs: uniqueSongs.slice(0, 10)
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 @routes POST /api/song/like/:songId
 @desc Like a song
 */
export const likeSong = async (req, res) => {
    try {
        const { songId } = req.params;
        const userId = req.user.id;

        const song = await songModel.findById(songId);

        if (!song) {
            return res.status(404).json({
                success: false,
                message: "Song not found"
            });
        }

        const like = await songLikeModel.findOne({
            user: userId,
            song: songId
        });

        if (like) {
            await like.deleteOne();

            await songModel.findByIdAndUpdate(songId, {
                $inc: { likeCount: -1 }
            });

            return res.status(200).json({
                success: true,
                message: "Song unliked successfully",
                liked: false
            });
        }

        await songLikeModel.create({
            user: userId,
            song: songId,
        });

        await songModel.findByIdAndUpdate(songId, {
            $inc: { likeCount: 1 }
        });

        res.status(200).json({
            success: true,
            message: "Song liked successfully",
            liked: true
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

/**
 @routes GET /api/song/liked
 @desc Get liked songs
 */
export const getLikedSongs = async (req, res) => {
    try {
        const userId = req.user.id;

        const likes = await songLikeModel.find({ user: userId }).populate("song").sort({ createdAt: -1 });
        const songs = likes.map((like) => like.song);

        res.status(200).json({
            success: true,
            message: "Songs fetched successfully",
            songs
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to fetch liked songs"
        });
    }
};