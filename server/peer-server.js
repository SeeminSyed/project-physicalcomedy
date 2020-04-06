// project/server/peer-server.js
const fs = require('fs'); // ?
const PeerServer = require('peer').PeerServer;

const server = PeerServer({
    port: 9000,
    path: '/'
    // ssl: { TODO:
    //     key: fs.readFileSync('../server.key', 'utf8'), // server key
    //     cert: fs.readFileSync('../server.crt', 'utf8') // server crt
    // }
});

console.log("Server has started on PORT 9000");

/// TODO: Make this into an express server
/// Implement a words api --> call datamuse api here..
/// hopefully that'll make the CORs (C A N C E R) issue go away..