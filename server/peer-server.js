// project/server/peer-server.js
const fs = require('fs');
const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 9000,
    path: '/',
    // ssl: { TODO:
    //     key: fs.readFileSync('../server.key', 'utf8'), // server key
    //     cert: fs.readFileSync('../server.crt', 'utf8') // server crt
    // }
});