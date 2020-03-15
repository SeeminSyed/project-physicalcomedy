// project/server/peer-server.js
const fs = require('fs');
const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 9000,
    path: '/'//,
    // TODO: set up SSL
    // ssl: {
    //     key: fs.readFileSync('./../certificates/key.pem', 'utf8'),
    //     cert: fs.readFileSync('./../certificates/cert.pem', 'utf8')
    // }
});