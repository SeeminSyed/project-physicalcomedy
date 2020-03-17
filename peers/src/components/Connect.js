import React from 'react';
import Peer from 'peerjs';

const style = {
    display: 'flex',
    margin: '20px 20px',
    flexDirection: 'column',
    flexGrow: '1',
    fontWeight: '300',
    fontSize: '200%',
}

const input = {
    margin: '10px 10px',
    flexGrow: '1',
    padding: '10px 10px 10px 10px',
    height: '15px',
    alignSelf: 'center',
    borderRadius: '10px',
}

const button = {
    background: '#ffffff',
    border: '2px #0e2b4d solid',
    alignSelf: 'center',
    fontSize: '50%',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#1d7786',
    fontFamily: `'Poppins', sans-serif`,
    padding: '10px 10px',
}

export default class Connect extends React.Component {
    constructor() {
        super();
        this.peer = new Peer('connector', {
            debug: 2
        });
        this.state = { key: '', hasError: false, errorMessage: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.initialize();
    }

    initialize() {
        this.peer.on('open', function (id) {
            console.log(`${id} is listening for connections..`);
        });
    }

    handleChange(event) {
        this.setState({ key: event.target.value });
    }

    handleSubmit(event) {
        console.log('A key was submitted: ' + this.state.key);
        event.preventDefault();
        // connect to the peer
        this.connect(this.state.key)
    }

    // send connections
    connect(peerid) {
        const conn = this.peer.connect(peerid, { reliable: true }, function (err) {
            if (err) {
                // error handling -- maybe will work?
                this.setState({ hasError: true, errorMessage: `Could not connect to ${peerid}` });
            }
        });
        conn.on('open', () => {
            conn.send('hi!');
        });
    }

    render() {
        return (
            <div className="peer-id" id="peer-id-form" style={style}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Peer ID:
                        <input style={input} type="text" value={this.state.value} onChange={this.handleChange} required />
                    </label>
                    <button style={button} type="submit">Submit</button>
                </form>
            </div>
        );
    };
}