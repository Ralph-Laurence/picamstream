const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const NodeWebcam = require('node-webcam');

// Create an instance of the Express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set up the webcam options
const webcamOptions = {
    width: 640,
    height: 480,
    quality: 100,
    frames: 30,
    saveShots: false,
    output: 'jpeg',
    device: false,
    callbackReturn: 'buffer',
    verbose: false
};

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Capture and emit webcam frames
io.on('connection', (socket) => {
    console.log('Client connected');
    
    const captureAndEmit = () => {
        NodeWebcam.capture('stream', webcamOptions, (err, frame) => {
            if (!err) {
                socket.emit('frame', frame.toString('base64'));
                setTimeout(captureAndEmit, 1000 / webcamOptions.frames);
            } else {
                console.log('Error capturing frame:', err);
            }
        });
    };
    captureAndEmit();
    
    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
