import React from 'react';
import ReactDOM from 'react-dom';
import Peer from 'peerjs';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const header = {
    padding: '20px',
    // textAlign: 'center',
    background: '#17a2b8',
    color: 'white',
    fontSize: '30px',
    display: 'flex',
    flex: '1',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'

};

const text = {
    flexDirection: 'column',
    padding: '25px'
};

class GameHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // id: props.id
        };
    }

    ctrlC(e) {
        // allows copy paste
        this.textArea.select();
        document.execCommand('copy');
        e.target.focus();
    }

    render() {
        return (
            <header style={header}>
                <text>Physical Comedy </text>
                <div>
                    <text id="roomId" style={{ fontSize: '80%' }} >Room Code: {this.props.id}</text>
                    <textarea
                        spellCheck='false'
                        style={{
                            background: '#17a2b8',
                            color: '#17a2b8',
                            fontSize: '1px',
                            border: 'none',
                            // width: '0',
                            // height: '0',
                            resize: 'none',
                        }}
                        ref={(textarea) => this.textArea = textarea}
                        value={this.props.id}
                        onClick={this.ctrlC.bind(this)}
                    />
                    <OverlayTrigger
                        // key=
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                Copy to Clipboard.
                            </Tooltip>
                        }
                    >
                        <Button variant="outline-light" style={{ fontSize: '50%' }} onClick={this.ctrlC.bind(this)}>📋</Button>
                    </OverlayTrigger>
                </div>
                <OverlayTrigger
                    // key=
                    placement='bottom'
                    overlay={
                        <Tooltip>
                            Need Help?
                        </Tooltip>
                    }
                >
                    <Button variant="outline-light" onClick={this.props.onClick}> Help? </Button>
                </OverlayTrigger>
            </header>
        );
    }
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
        </div>);
    }
}

class GameOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
        </div>);
    }
}

class CallOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
        </div>);
    }
}

class Streams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
        </div>);
    }
}

class Room extends React.Component {
    constructor() {
        super();
        this.state = {
            localId: '',
        };

        // make peer 
        this.peer = new Peer();
        console.log("peer", this.peer);
    }

    componentDidMount() {
        // create room open connection
        // on join, get message asking if allow
        // if allow: add to peerlist [end] & send all peers peerlist/streams

        // If host: 'end room' 
        // send everyone empty list & clone connection
        // new peer
        // new connection
    }

    render() {
        return (
            <div>
                <GameHeader
                    id="dfghjk"
                />
                {/* <div id="body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div id="left" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <GameOptions
                        // ...
                        />
                        <ChatBox
                        // ...
                        />
                    </div>
                    <div id="right" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <Streams
                        // ...
                        />
                        <CallOptions
                        // ...
                        />
                    </div>
                </div> */}
            </div>
        );
    }
}
export default Room;
