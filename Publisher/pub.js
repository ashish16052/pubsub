const express = require('express');
const redis = require('redis');
const port = process.env.PORT || 3001
const app = express();
const redisClient = redis.createClient();

app.get('/', (req, res) => {
    const id = Date.now()
    const message = {
        id: id,
        name: `message ${id}`
    }
    redisClient.publish('channel', JSON.stringify(message))
    res.send('message published')
})

app.listen(port, () => {
    redisClient.connect();
    console.log(`Running on port ${port}`);
})