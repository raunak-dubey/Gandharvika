import pino from 'pino';

const isProduction = process.env.NODE_ENV === "production";

const logger = pino({
    level: process.env.LOG_LEVEL || (isProduction ? "info" : "debug"),
    redact: [
        'req.headers.authorization',
        'req.headers.cookie',
        'req.body.password',
        'req.body.token'
    ],
    base: {
        service: "gandharvika-api",
        env: process.env.NODE_ENV
    },
    timestamp: pino.stdTimeFunctions.isoTime,
    ...(isProduction ? {} : {
        transport: {
            target: 'pino-pretty',
            options: {
                colorize: true,
                ignore: 'pid,hostname',
                translateTime: 'yyyy-mm-dd HH:MM:ss'
            }
        }
    }),
});

export default logger;