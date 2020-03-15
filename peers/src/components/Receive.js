import React from 'react';
import Peer from 'peerjs';

// css for this component
const style = {
    display: 'flex',
    margin: '20px 20px',
    flexDirection: 'column',
    flexGrow: '1',
    fontWeight: '300',
    fontSize: '200%',
};

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
        // return (<div className="peer" style={style}>Peer id: [ADD A KEY HERE]</div>)
        return (<div className="peer" style={style}>Peer id: {this.peer.id}</div>);
    }
}