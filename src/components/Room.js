import React from 'react';
import ReactDOM from 'react-dom';
import Peer from 'peerjs';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';

class GameHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    ctrlC(e) {
        // https://stackoverflow.com/questions/56704138/i-want-to-create-a-copy-to-clipboard-using-react-js
        // copy room code to clipboard
        this.textArea.select();
        document.execCommand('copy');
        e.target.focus();
    }

    render() {
        return (
            <header style={{
                padding: '20px',
                background: '#17a2b8',
                color: 'white',
                fontSize: '30px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                {/* Title */}
                <text><span role="img" aria-label="emoji">🎉</span> Physical Comedy </text>
                {/* Room Code */}
                <div>
                    <text id="roomId" style={{ fontSize: '80%' }} >Room Code: {this.props.id}</text>
                    <textarea
                        spellCheck='false'
                        style={{
                            background: '#17a2b8',
                            color: '#17a2b8',
                            fontSize: '1px',
                            border: 'none',
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
                {/* Help button */}
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
        this.state = {
            user: props.localId,
            turn: props.turn,
            messageText: '',
            messages: props.messages,
        };
        this.updateScroll = this.updateScroll.bind(this);
    }

    componentDidMount() {
        this.updateScroll();
    }

    componentDidUpdate() {
        this.updateScroll();
    }

    updateScroll() {
        let element = document.getElementById("messageBoard");
        element.scrollTop = element.scrollHeight;
    }

    handleChange = event => {
        this.setState({ messageText: event.target.value });
    };

    render() {
        // return(<div></div>);
        // https://www.cometchat.com/tutorials/build-an-anonymous-chat-app-with-react-react-bootstrap/
        return (
            <div
                // className='bg-light page'
                style={{
                    height: '100%',
                    width: '100%',
                    overflow: 'hidden'
                }}
            >
                <Col style={{ width: '100%', margin: '0px', padding: '0px' }}>
                    {/* Message log */}
                    <Container style={{ padding: '10px', marginTop: '10px' }}>
                        <div>
                            <code id="messageBoard" style={{
                                display: 'block',
                                height: '70vh',
                                overflow: 'scroll',
                                overflowX: 'hidden',
                                width: "100%",
                            }}>
                                {
                                    this.props.messages.map(msg => {
                                        switch (msg.type) {
                                            case "meta":
                                                return (<li className='list-group list-group-flush' key={msg.name}>
                                                    <text style={{ color: '#808080' }}> >>> {msg.text} </text>
                                                </li>)
                                            case "local":
                                                return (<li className='list-group list-group-flush' key={msg.name}>
                                                    <text style={{ color: '#17b87e' }}> <strong>{msg.name}</strong>: {msg.text} </text>
                                                </li>)
                                            case "peer":
                                                return (<li className='list-group list-group-flush' key={msg.name}>
                                                    <text style={{ color: '#17a2b8' }}> <strong>{msg.name}</strong>: {msg.text} </text>
                                                </li>)
                                            default:
                                                return (<li className='list-group list-group-flush' key={msg.name}>
                                                    <text style={{ color: '#17a2b8' }}> <strong>{msg.name}</strong>: {msg.text} </text>
                                                </li>)
                                        }
                                    }
                                    )
                                }
                            </code>
                        </div>
                    </Container>
                    {/* Message Submit */}
                    <Container id='messageForm' class="fixed-bottom" style={{ marginTop: '10px', marginBottom: '10px' }}>
                        <Form
                            inline
                            onSubmit={(e) => {
                                e.preventDefault();
                                this.setState({
                                    messageText: ''
                                })
                                this.props.onClick(this.state.messageText)
                            }}
                        // style={{display: 'flex',  justifyContent: 'space-between', alignContent: 'stretch'}}
                        >
                            <Form.Group style={{ flex: 1 }}>

                                {
                                    this.props.turn ?
                                        (
                                            <Form.Control
                                                value={this.state.messageText}
                                                style={{ width: '100%' }}
                                                required
                                                type='text'
                                                placeholder='Type guess here...'
                                                onChange={this.handleChange}
                                                disabled='true'
                                            />
                                        ) : (
                                            <Form.Control
                                                value={this.state.messageText}
                                                style={{ width: '100%' }}
                                                required
                                                type='text'
                                                placeholder='Type guess here...'
                                                onChange={this.handleChange}
                                            />
                                        )
                                }
                            </Form.Group>
                            {/* <Button variant="info" type='submit'> Send </Button> */}

                        </Form>
                    </Container>

                </Col>
            </div >
        );
    }
}

function PeerVideo(props) {
    return (
        <video id={props.id} width="100" height="100" autoPlay="autoplay" className="mx-auto d-block" style={{ margin: '10px 10px', width: 'auto', }} /*onClick={props.onClick}*/></video>
    );
}

class Streams extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            localId: props.localId,
            localName: props.localName,
            localStream: props.localStream,
            mute: props.mute,
            camOn: props.camOn,
            deafen: props.deafen,
            peers: props.peers
        };
        // TODO: mute, deafen, camOn, peers
    }

    renderPeerVideo(peerName) {
        return (
            <PeerVideo
                id={peerName}
            // onClick={() => this.handleCanvasClick(peerName)}
            />
        );
    }

    render() {
        return (
            <div style={{ width: '50%', height: 'auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', alignContent: 'center', /*alignItems: 'center',*/ }}>
                <video id="my-camera" width="50%" height="225" autoPlay="autoplay" muted={true} /*className="mx-auto d-block"*/></video>
                <canvas id="feed"></canvas>
                <div id="peers">
                    {this.state.peers.map((peer) => (
                        <div key={peer.id}>
                            {this.renderPeerVideo(peer.name)}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

class GameOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

class CallOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
            </div>
        );
    }
}

class Room extends React.Component {
    constructor() {
        super();
        // WHEN STATE CHANGES, THE COMPONENT RERENDER, SO BE CAREFUL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        this.state = {
            localId: 'harry',
            localName: 'harry',
        };

        // Objects used by composite components
        this.localStream = null;
        this.messages = [
            {
                name: "",
                type: "meta",
                text: "Write your guess here or just send messages to your mates!",
            }
        ];
        this.peers = [
            // {
            //     id: '',
            //     name: '',
            //     stream: null,
            // },
        ];

        // Function binding

        // make peer 
        // this.peer = new Peer();
        // console.log("peer", this.peer);
    }

    componentDidMount() {
        // create room open connection
        // on join, get message asking if allow
        // if allow: add to peerlist [end] & send all peers peerlist/streams

        // If host: 'end room' 
        // send everyone empty list & clone connection
        // new peer
        // new connection

        // Updated scrollbar to bottom of the page
    }

    sendMessage(message) {
        //TODO: add to messagelist and send to all other users
        console.log('message', message);
        this.messages.push({ name: this.state.localId, type: "local", text: message })
    }

    render() {
        return (
            <div>
                <GameHeader
                    id={this.state.localId}
                />
                <div id="body" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', height: 'auto' }}>
                    <div id="left" className='bg-light page' style={{ display: 'flex', alignItems: 'stretch', flexBasis: '25%', }}>
                        <ChatBox
                            // TODO: When peerlist update, send message to chat
                            onClick={this.sendMessage.bind(this)}
                            messages={this.messages}
                        />
                    </div>
                    <div id="right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Streams
                            localId={this.state.localId}
                            localName={this.state.localName}
                            localStream={this.state.localStream}
                            peers={this.peers}
                        />
                        <div id="bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <CallOptions
                            // ...
                            />
                            <GameOptions
                            // ...
                            />

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;
