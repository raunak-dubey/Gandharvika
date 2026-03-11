import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";

import { playSong, getListeningHistory } from "../controller/listeningHistory.controller.js";

const listeningHistoryRouter = Router();

/**
 @routes POST /api/history/play/:songId
 @desc Log play event
 */
listeningHistoryRouter.post('/play/:songId', authMiddleware, playSong);

/**
 @routes GET /api/history
 @desc Get listening history
*/
listeningHistoryRouter.get('/', authMiddleware, getListeningHistory);

export default listeningHistoryRouter;