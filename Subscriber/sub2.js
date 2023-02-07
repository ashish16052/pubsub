const express = require('express');
const redis = require('redis');
const port = process.env.PORT || 3003
const app = express();
const redisClient = redis.createClient();
var notifications = [];

(async () => {
    const subscriber = redisClient.duplicate();
    await subscriber.connect();
  
    await subscriber.subscribe('channel', (message) => {
        console.log(message);
        notifications.push(JSON.parse(message))
    });
})();

app.get('/', (req, res) => {
    res.status(200).json(notifications)
})

app.listen(port, () => {
    console.log(`Running on port ${port}`);
})