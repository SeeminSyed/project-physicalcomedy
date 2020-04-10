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
import { MdContentCopy, MdVideocam, MdVideocamOff, MdCallEnd, MdRefresh } from 'react-icons/md';
import { FaMicrophoneSlash, FaMicrophone, FaDrawPolygon, FaPaintBrush } from 'react-icons/fa';
import Instructions from './Instructions';

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
                position: 'fixed',
                padding: '20px',
                background: '#17a2b8',
                color: 'white',
                fontSize: '30px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                top: '0',
                left: '0',
                right: '0',
                width: '100%',
            }}>
                {/* Title */}
                <text><span role="img" aria-label="emoji">🎉</span> Physical Comedy </text>
                {/* Room Code */}
                <div>
                    <textarea
                        readOnly={true}
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
                    <text id="roomId" style={{ fontSize: '80%' }} >Room Code: {this.props.id} </text>
                    <OverlayTrigger
                        delay={{ show: 250, hide: 400 }}
                        placement='bottom'
                        overlay={
                            <Tooltip>
                                Copy to Clipboard.
                            </Tooltip>
                        }
                    >
                        <Button variant="outline-light" style={{ fontSize: '50%', }} onClick={this.ctrlC.bind(this)}><MdContentCopy /></Button>
                    </OverlayTrigger>
                </div>
                {/* Help button */}
                <OverlayTrigger
                    delay={{ show: 250, hide: 400 }}
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
                    <Container id='messageForm' style={{ marginTop: '10px', marginBottom: '10px' }}>
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
                                                placeholder='Type here...'
                                                onChange={this.handleChange}
                                                disabled='true'
                                            />
                                        ) : (
                                            <Form.Control
                                                value={this.state.messageText}
                                                style={{ width: '100%' }}
                                                required
                                                type='text'
                                                placeholder='Type here...'
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
            <Container style={{
                overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', alignContent: 'center', /*alignItems: 'center',*/
                height: 'inherit',
            }}>
                <video id="my-camera" width="auto" height="225" autoPlay="autoplay" muted={true} /*className="mx-auto d-block"*/></video>
                <canvas id="feed" ></canvas>
                <div id="peers">
                    {this.state.peers.map((peer) => (
                        <div key={peer.id}>
                            {this.renderPeerVideo(peer.name)}
                        </div>
                    ))}
                </div>
            </Container>
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
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>Paint Mode {this.state.doodler ? "Off" : "On"}</Tooltip>}>
                    {this.state.doodler ?
                        // on
                        <Button variant="info" /*onClick={this.videoButtonClick.bind*/ size="lg" >
                            <FaPaintBrush />
                        </Button>
                        :
                        // off
                        <Button variant="outline-secondary" /*onClick={this.videoButtonClick.bind*/ size="lg" >
                            <FaPaintBrush />
                        </Button>
                    }

                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>Get Another Word</Tooltip>}>
                    <Button variant="info" id="wordbutton" /*onClick={this..bind*/ size="lg" ><MdRefresh /></Button>
                </OverlayTrigger>
            </div>
        );
    }
}
// MdVideocam, MdVideocamOff, MdCallEnd, MdRefresh,
class CallOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>Camera {this.state.localCam ? "On" : "Off"}</Tooltip>}>
                    {this.state.localCam ?
                        // on
                        <Button variant="info" /*onClick={this.camButtonClick.bind*/ size="lg" >
                            <MdVideocam />
                        </Button>
                        :
                        // off
                        <Button variant="outline-secondary" /*onClick={this.videoButtonClick.bind*/ size="lg" >
                            <MdVideocamOff />
                        </Button>
                    }

                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>{this.state.local ? "UnMuted" : "Muted"}</Tooltip>}>
                    {this.state.local ?
                        // on
                        <Button variant="info" /*onClick={this.camButtonClick.bind*/ size="lg" >
                            <FaMicrophone />
                        </Button>
                        :
                        // off
                        <Button variant="outline-secondary" /*onClick={this.videoButtonClick.bind*/ size="lg" >
                            <FaMicrophoneSlash />
                        </Button>
                    }

                </OverlayTrigger>
                <OverlayTrigger
                    placement="bottom"
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>End Call</Tooltip>}>
                    <Button variant="danger" /*onClick={this.camButtonClick.bind*/ size="lg" >
                        <MdCallEnd />
                    </Button>
                </OverlayTrigger>
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
            <div style={{
                position: 'absolute',
                top: 0, right: 0, bottom: 0, left: 0,
            }}>
                <GameHeader
                    id={this.state.localId}
                />
                <div id="body" className='bg-light page' style={{
                    display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
                    marginTop: '92px',
                    // marginBottom: '85px',
                    // position: 'absolute',
                    // top: 0, right: 0, bottom: 0, left: 0,
                }}>
                    <div id="left" style={{ display: 'flex', alignItems: 'stretch', flexBasis: '20%', maxWidth: '20%'}}>
                        <ChatBox
                            // TODO: When peerlist update, send message to chat
                            onClick={this.sendMessage.bind(this)}
                            messages={this.messages}
                        />
                    </div>
                    <div id="right" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexBasis: '80%', maxWidth: '80%'}}>
                        <div id='top' style={{ display: 'flex', height: '75vh',  flexBasis: '80%', maxWidth: '100%', }}>
                            <Streams
                                localId={this.state.localId}
                                localName={this.state.localName}
                                localStream={this.state.localStream}
                                peers={this.peers}
                            />
                        </div>
                        <div id="bottom" style={{ 
                            display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', justifyItems: 'center', alignItems: 'center', 
                            flexBasis: '20%', width: '100%', height: '100%'}}>
                            <CallOptions
                            // ...
                            />
                            <GameOptions
                            // ...
                            />

                        </div>
                    </div>
                </div>
            </ div>
        );
    }
}

export default Room;
