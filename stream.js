const express = require('express');
const NodeWebcam = require('node-webcam');

const app = express();
const webcam = NodeWebcam.create({});

app.get('/capture', (req, res) => {
    NodeWebcam.capture('image', function(err, data) {
        if (err) {
            res.status(500).send('Error capturing image');
        } else {
            res.sendFile(data);
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
