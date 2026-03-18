import { Router } from 'express';
import { getSongs, uploadSong, getRecommendedSongs, likeSong, getLikedSongs } from '../controller/song.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import upload from '../middlewares/upload.middleware.js';

const songRouter = Router();

/**
 @routes POST /api/song/
 @desc Upload a song.
 */
songRouter.post('/', authMiddleware, upload.single('song'), uploadSong);

/**
 @routes Get /api/song/
 @desc get all songs.
 */
songRouter.get('/', authMiddleware, getSongs);

/**
 @routes GET /api/song/recommend
 @desc get mood based recommendations
 */
songRouter.get('/recommend', authMiddleware, getRecommendedSongs);

/**
 @routes POST /api/song/like/:songId
 @desc Like a song
 */
songRouter.post('/like/:songId', authMiddleware, likeSong);

/**
 @routes GET /api/song/liked
 @desc Get liked songs
 */
songRouter.get('/liked', authMiddleware, getLikedSongs);

export default songRouter;