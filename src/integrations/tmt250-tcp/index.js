// config
// configuration
const config = require('../../common/config.json').service.tmt250tcp;

const AVLDecoder = require('./tmt250-node/index');

// system imports
const net = require('net');
const fs = require('fs');

// vars
let sockets = [];
let decoders = [];

// create socket server
const server = net.createServer();
server.listen(config.port, config.host, () => {
    console.log('TCP Server is running on port ' + config.port + '.');
});

// listen to sockets
server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    sockets.push(sock);
    decoders.push(new AVLDecoder(sock.remoteAddress, sock.remotePort));

    sock.on('data', (data) => {
        try {
            console.log('DATA ' + sock.remoteAddress + ':' + sock.remotePort + ': ' + data);
            let dataEnter = data.toString("base64");
            fs.appendFileSync('tmt250-sample.txt', dataEnter + '\n');

            //setTimeout(() => {
                sock.write(Buffer.from([1]));
            // }, 10);

            // });
        } catch(e) {
            console.log("Err", e);
        }
    });

    // Add a 'close' event handler to this instance of socket
    sock.on('close', function(data) {
        let index = sockets.findIndex(function(o) {
            return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
        })
        if (index !== -1) sockets.splice(index, 1);
        console.log('CLOSED: ' + sock.remoteAddress + ' ' + sock.remotePort);
    });
});