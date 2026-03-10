import id3 from 'node-id3';
import uploadFile from '../services/storage.service.js';
import songModel from '../models/song.model.js';

export const uploadSong = async (req, res) => {
    const songBuffer = req.file.buffer;
    const { mood } = req.body;

    const tags = id3.read(songBuffer);
    
    const [ songFile, thumbnailFile ] = await Promise.all([
        uploadFile({
            buffer: songBuffer,
            fileName: tags.title + '.mp3',
            folder: "/Gandharvika/songs"
        }),
        uploadFile({
            buffer: tags.image.imageBuffer,
            fileName: tags.title + '.jpeg',
            folder: "/Gandharvika/thumbnail"
        })
    ]);

    const song = await songModel.create({
        title: tags.title,
        artist: tags.artist,
        album: tags.album,
        mood,
        url: songFile.url,
        thumbnail: thumbnailFile.url
    });

    res.status(200).json({
        success: true,
        message: "Song uploaded successfully",
        song
    });
};

export const getSongs = async (req, res) => {
    const { mood } = req.query;
    const songs = await songModel.find({ mood });

    res.status(200).json({
        success: true,
        message: "Songs fetched successfully",
        songs
    });
};