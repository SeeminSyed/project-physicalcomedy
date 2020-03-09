import React from 'react';
import Peer from 'peerjs';

export default class Connect extends React.Component {
    constructor() {
        super();
        this.peer = new Peer();
        console.log(this.peer.id);

        this.state = { key: '' };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ key: event.target.value });
    }

    handleSubmit(event) {
        console.log('A key was submitted: ' + this.state.key);
        event.preventDefault();
        console.log('created a new peer ', this.peer.id);
        // connect to the peer
        this.connect(this.state.key)
    }

    // send connections
    connect(peerid) {
        const conn = this.peer.connect(peerid);
        conn.on('open', () => {
            conn.send('hi!');
        });
    }
    
    // make a call here

    // show the incoming video stream

    render() {
        // renders something here..
        return (
            <div id="peer-id-form">
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Peer ID:   
                        <input type="text" value={this.state.value} onChange={this.handleChange} required />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    };
}