import { Router } from 'express';
import { getSongs, uploadSong } from '../controller/song.controller.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import uploadMiddleware from '../middlewares/upload.middleware.js';

const songRouter = Router();

/**
 @routes POST /api/song/
 @desc Upload a song.
 */
songRouter.post('/', uploadMiddleware, authMiddleware, uploadSong);

/**
 @routes Get /api/song/
 @desc get all songs.
 */
songRouter.get('/', authMiddleware, getSongs);

export default songRouter;