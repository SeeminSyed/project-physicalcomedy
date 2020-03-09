import React from 'react';
import Peer from 'peerjs';

export default class Receive extends React.Component {
    constructor() {
        super();
        // create a new peer
        this.peer = new Peer();
    }

    // recieve connections
    Connect() {
        this.peer.on('connection', (conn) => {
            conn.on('data', (data) => {
                // Will print 'hi!'
                console.log(data);
            });
            conn.on('open', () => {
                conn.send('hello!');
            });
        });
    }

    // answer/decline the incoming call

    // show the incoming video stream

    render() {
        // render the stream here
        console.log(this.peer.id);
        return (<div>Peer id: {this.peer.id}</div>);
    }
}