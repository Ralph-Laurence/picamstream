const express = require('express');
const { Server } = require('ws');
const { Stream } = require('node-rtsp-stream');
const crypto = require('crypto');

const app = express();
const server = require('http').createServer(app);
const wss = new Server({ server });

const SERVER_PORT = 5000;

// Store tokens
const tokens = new Set();

app.get('/token', (req, res) => {
    const token = crypto.randomBytes(16).toString('hex');
    tokens.add(token);
    // Token expires after 5 minutes
    setTimeout(() => tokens.delete(token), 5 * 60 * 1000);
    res.json({ token });
});

wss.on('connection', (ws, req) => {
    const urlParams = new URLSearchParams(req.url.replace('/?', ''));
    const token = urlParams.get('token');

    if (!tokens.has(token)) {
        ws.close();
        return;
    }

    tokens.delete(token);

    console.log('Client connected');
    const stream = new Stream({
        rtspUrl: 'rtsp://your_camera_ip:554/stream0',  // Replace with your camera's RTSP URL
        wsPort: 8089
    });

    stream.on('data', (data) => {
        ws.send(data);
    });

    ws.on('close', () => {
        console.log('Client disconnected');
        stream.close();
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

server.listen(5000, () => {
    console.log('Server started on port 5000');
});
