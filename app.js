var http   = require('http');
var server = http.createServer( (req, res ) => {
    console.log(`request has been made: ${req.url}`);
    
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('yoo ninjaz');
});

server.listen(3000, '127.0.0.1');
console.log(`yo dawgz, now listening to '127.0.0.1:3000'`);