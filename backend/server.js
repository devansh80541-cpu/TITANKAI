const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const redis = require("redis");
const searchRoute = require('./routes/searchRoute');
const mediaInfoRoute = require('./routes/mediaInfoRoute');
const mediasByParamsRoute = require('./routes/mediasByParamsRoute');
const newsRoute = require('./routes/newsRoute');
const mediaEpisodesRoute = require('./routes/mediaEpisodesRoute');
const imdbRoute = require('./routes/imdbRoute');
const mediaChaptersRoute = require('./routes/mediaChaptersRoute');

dotenv.config();

const memoryCache = new Map();

let redisClient = {
    on: (event, handler) => {},
    connect: async () => { console.log("#### -> High-Performance In-Memory Cache Initialized!"); },
    ping: async () => { return "PONG"; },
    get: async (key) => {
        const item = memoryCache.get(key);
        if (!item) return null;
        if (Date.now() > item.expiresAt) {
            memoryCache.delete(key);
            return null;
        }
        return item.data;
    },
    setEx: async (key, expirationInSeconds, data) => {
        memoryCache.set(key, {
            data: data,
            expiresAt: Date.now() + (expirationInSeconds * 1000)
        });
    },
    set: async (key, data) => {
        memoryCache.set(key, { data, expiresAt: Infinity });
    }
};

(async () => {
    console.log("#### -> Initializing API Cache System...");
    await redisClient.connect();
    await redisClient.ping();
})()

const app = express();

const port = process.env.PORT || 1234;

// Middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    req.redisClient = redisClient;
    next();
});

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the TITANKAI (タイタンカイ) API Server!' });
});

app.use("/search", searchRoute)
app.use("/media-info", mediaInfoRoute)
app.use("/medias", mediasByParamsRoute)
app.use("/episodes", mediaEpisodesRoute)
app.use("/chapters", mediaChaptersRoute)
app.use("/news", newsRoute)
app.use("/imdb", imdbRoute)

// Start server
app.listen(port, () => {
    console.log(`#### -> Starting TITANKAI (タイタンカイ) API Server...`);
    console.log(`#### -> Environment: ${process.env.DEV_MODE === 'true' ? 'Development' : 'Production'}`);
    console.log(`#### -> Server is live!`);
    console.log(`#### -> Listening on port: ${port}`);
});
