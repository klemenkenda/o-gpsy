// config
// configuration
const config = require('../../common/config.json').service.tmt250tcp;

// services
const AVLDecoder = require('./tmt250-node/index');
const Storage = require('../../server/services/gps_storage_mariadb');

// system imports
const net = require('net');
const fs = require('fs');

// create storage
const storage = new Storage();

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
    let decoder = new AVLDecoder(sock.remoteAddress, sock.remotePort);
    decoders.push(decoder);

    sock.on('data', (data) => {
        try {
            // logging
            console.log(decoder.IMEI, decoder.port, decoder.remote);
            console.log('DATA ' + sock.remoteAddress + ':' + sock.remotePort + ': len = ' + data.length);

            // appending to log file
            let dataEnter = data.toString("base64");
            fs.appendFileSync('tmt250-sample.txt', dataEnter + '\n');

            // processing of the records
            if (decoder.IMEI === "") {
                if (decoder.identify(data)) {
                    console.log("Node identified: " + decoder.IMEI);
                    // send ACK
                    sock.write(Buffer.from([1]));
                } else {
                    console.log("Error identifying node: " + data);
                }
            } else {
                let response = decoder.decodeAVL(data);
                // display timestamps
                response.records.forEach((record) => {
                    storage.addGPS(decoder.IMEI, "", record.lat, record.lon, Math.round(record.timestamp / 1000));
                    console.log(decoder.IMEI, Math.round(record.timestamp / 1000), record.lat, record.lon);
                })
                sock.write(decoder.generateAVLResponse());
            }

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