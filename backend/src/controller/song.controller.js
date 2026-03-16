import id3 from 'node-id3';
import { parseBuffer } from 'music-metadata';
import uploadFile from '../services/storage.service.js';
import songModel from '../models/songs/song.model.js';
import songLikeModel from '../models/songs/songLike.model.js';
import listeningHistoryModel from '../models/listeningHistory.model.js';
import { BadRequestError, NotFoundError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { delCache, getCache, setCache } from '../utils/cache.js';

/**
 @routes POST /api/song/
 @desc Upload a song.
 */
export const uploadSong = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new BadRequestError("No file uploaded");
    }

    const songBuffer = req.file.buffer;
    const { mood, tags } = req.body;

    const id3Tags = id3.read(songBuffer);
    const parsedTags = await parseBuffer(songBuffer);

    const duration = Math.round(parsedTags.format.duration || 0);

    if (!duration) {
        throw new BadRequestError(400, "Invalid audio file");
    }

    if (!id3Tags.title || !id3Tags.artist) {
        throw new BadRequestError("Invalid ID3 metadata");
    }

    const exists = await songModel.findOne({
        title: id3Tags.title,
        artist: id3Tags.artist
    }).lean();

    if (exists) {
        throw new BadRequestError("Song already exists");
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

    await delCache(`recommend:*`);

    res.status(201).json({
        success: true,
        message: "Song uploaded successfully",
        song
    });
});

/**
 @routes Get /api/song/
 @desc get all songs.
 */
export const getSongs = asyncHandler(async (req, res) => {
    const { mood } = req.query;

    const cacheKey = `songs:${mood || 'neutral'}`;
    const cached = await getCache(cacheKey);
    if (cached) {
        return res.status(200).json({
            success: true,
            songs: cached
        });
    }

    const filter = mood ? { mood } : {};
    const songs = await songModel.find(filter).sort({ playCount: -1 }).limit(10).lean();

    await setCache(cacheKey, songs, 600);

    res.status(200).json({
        success: true,
        message: "Songs fetched successfully",
        songs
    });
});

/**
 @routes GET /api/song/recommend
 @desc get mood based recommendations
 */
export const getRecommendedSongs = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const cacheKey = `recommend:${userId}`;
    const cached = await getCache(cacheKey);
    if (cached) {
        return res.status(200).json({
            success: true,
            message: "Songs fetched from cache",
            songs: cached
        });
    }

    const [likedSongs, popular, historySongs] = await Promise.all([
        songLikeModel.aggregate([
            { $match: { user: userId } },
            { $lookup: { from: "songs", localField: "song", foreignField: "_id", as: "song" } },
            { $unwind: "$song" },
            { $replaceRoot: { newRoot: "$song" } },
            { $sample: { size: 5 } },
            { $project: { title: 1, artist: 1, mood: 1, audioUrl: 1, thumbnail: 1, playCount: 1, tags: 1 } },
        ]),

        songModel.aggregate([
            { $sort: { playCount: -1 } },
            { $limit: 10 },
            { $project: { title: 1, artist: 1, mood: 1, audioUrl: 1, thumbnail: 1, playCount: 1, tags: 1 } }
        ]),

        listeningHistoryModel.aggregate([
            { $match: { user: userId } },
            { $sort: { createdAt: -1 } },
            { $limit: 20 },
            { $lookup: { from: "songs", localField: "song", foreignField: "_id", as: "song" } },
            { $unwind: "$song" },
            { $replaceRoot: { newRoot: "$song" } },
            { $project: { title: 1, artist: 1, mood: 1, audioUrl: 1, thumbnail: 1, playCount: 1, tags: 1 } },
        ]),
    ]);

    const tags = [
        ...historySongs.flatMap(s => s.tags || []),
        ...likedSongs.flatMap(s => s.tags || []),
    ]
    const uniqueTags = [...new Set(tags)];
    let tagSongs = [];

    if (uniqueTags.length) {
        tagSongs = await songModel.aggregate([
            { $match: { tags: { $in: uniqueTags } } },
            { $sample: { size: 10 } },
            { $project: { title: 1, artist: 1, mood: 1, audioUrl: 1, thumbnail: 1, playCount: 1, tags: 1 } },
        ]);
    }

    const recentSongs = await songModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title artist mood audioUrl thumbnail playCount tags");

    const recommendations = [
        ...likedSongs,
        ...historySongs,
        ...tagSongs,
        ...recentSongs,
        ...popular
    ];

    const uniqueSongs = Array.from(
        new Map(recommendations.map(s => [s._id.toString(), s])).values()
    );

    await setCache(cacheKey, uniqueSongs.slice(0, 10), 300);

    res.status(200).json({
        success: true,
        message: "Songs fetched successfully",
        songs: uniqueSongs.slice(0, 10)
    });
});

/**
 @routes POST /api/song/like/:songId
 @desc Like a song
 */
export const likeSong = asyncHandler(async (req, res) => {
    const { songId } = req.params;
    const userId = req.user.id;

    const song = await songModel.findById(songId).lean();

    if (!song) {
        throw new NotFoundError("Song not found");
    }

    const like = await songLikeModel.findOneAndDelete({
        user: userId,
        song: songId
    })

    if (like) {
        await songModel.updateOne({ _id: songId }, { $inc: { likeCount: -1 } });

        return res.status(200).json({
            success: true,
            liked: false
        });
    }

    await songLikeModel.create({
        user: userId,
        song: songId,
    });

    await songModel.updateOne({ _id: songId }, { $inc: { likeCount: 1 } });

    await delCache(`recommend:*`);

    res.status(200).json({
        success: true,
        liked: true
    });
});

/**
 @routes GET /api/song/liked
 @desc Get liked songs
 */
export const getLikedSongs = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const likes = await songLikeModel.find({ user: userId }).populate("song").sort({ createdAt: -1 }).lean();
    const songs = likes.map((like) => like.song);

    res.status(200).json({
        success: true,
        message: "Songs fetched successfully",
        songs
    });
});