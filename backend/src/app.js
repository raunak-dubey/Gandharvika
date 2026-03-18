// ? Core Imports
import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

// ? Static Imports
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// ? Security Imports
import helmetConfig from "./utils/helmet.js";
import {
    apiLimiter,
    authLimiter,
} from "./middlewares/rateLimiter.middleware.js";

// ? Logging Imports
import pinoHttp from "pino-http";
import logger from "./utils/logger.js";

// ? Routes Imports
import authRouter from "./routes/auth.route.js";
import songRouter from "./routes/song.route.js";
import listeningHistoryRouter from "./routes/listeningHistory.route.js";
import moodLogRouter from "./routes/mood.route.js";
import userRouter from "./routes/user.route.js";
import sessionRouter from "./routes/session.routes.js";

// ? Error Handling Imports
import errorHandler from "./middlewares/errorHandler.middleware.js";
import { connect } from "node:http2";

// ? Resolve __dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

// ? Core middlewares

app.use(
    cors({
        origin: true,
        credentials: true,
    }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ? Security middlewares
app.use(helmetConfig);

// ? Logging middleware
app.use(
    pinoHttp({
        logger,
        customLogLevel: (res, err) => {
            if (err || res.statusCode >= 500) return "error";
            if (res.statusCode >= 400) return "warn";
            return "info";
        },
    }),
);

// ? API Rate Limiter
app.use("/api", apiLimiter);

// ? Routes
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/song", songRouter);
app.use("/api/history", listeningHistoryRouter);
app.use("/api/mood", moodLogRouter);
app.use("/api/user", userRouter);
app.use("/api/session", sessionRouter);

// ? Static files
app.use(express.static(join(__dirname, "../public/dist")));
app.get("/{*any}", (req, res) => {
    if (req.path.startsWith("/api")) return next();
    if (req.path.includes(".")) return next();
    res.sendFile(join(__dirname, "../public/dist/index.html"));
});

// ? Global Error handler
app.use(errorHandler);

export default app;
