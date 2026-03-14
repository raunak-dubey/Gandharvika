import redis from "../config/cache.config.js";

export const getCache = async (key) => {
    const data = await redis.get(key);
    return data ? JSON.parse(data) : null;
};

export const setCache = (key, value, ttl = 300) => {
    return redis.set(key, JSON.stringify(value), "EX", ttl);
};

export const delCache = (key) => {
    return redis.del(key);
};