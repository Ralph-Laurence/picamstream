const express = require('express')              // Express js
const { Server } = require('ws');               // Websocket
const { Stream } = require('node-rtsp-stream')  // Realtime Stream Protocol

const app = express();
const server = require('http').createServer(app);
const wss = new Server({ server })

const serverPort = 5000

wss.on('connection', (ws) => {
    console.log('client connected');
    const stream = new Stream({
        
    });
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
});

server.
server.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`)
})

