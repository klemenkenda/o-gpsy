const net = require('net');
const fs = require('fs');
const port = 8001;
const host = '194.249.231.93';

const server = net.createServer();
server.listen(port, host, () => {
    console.log('TCP Server is running on port ' + port + '.');
});

let sockets = [];

server.on('connection', function(sock) {
    console.log('CONNECTED: ' + sock.remoteAddress + ':' + sock.remotePort);
    //console.log(sock);
    sockets.push(sock);

    sock.on('data', function(data) {
        try {
            console.log('DATA ' + sock.remoteAddress + ':' + sock.remotePort + ': ' + data);
            let dataEnter = data.toString("base64");
            fs.appendFileSync('tmt250-sample.txt', dataEnter + '\n');

            // Write the data back to all the connected, the client will receive it as data from the server
            // sockets.forEach(function(sock, index, array) {
                setTimeout(() => {
                    sock.write(Buffer.from([1]));
                }, 10);

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