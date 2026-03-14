import Redis from 'ioredis';
import logger from '../utils/logger.js';

const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,

    maxRetriesPerRequest: 3,
    enableReadyCheck: true,
    retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
    }
})

redis.on('connect', () => {
    logger.info('Server is connected to redis')
});

redis.on('error', (error) => {
    logger.error('Failed to connect redis', error)
})

export default redis;