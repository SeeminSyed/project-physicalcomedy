import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import { MdContentCopy, MdExitToApp, MdVideocam, MdVideocamOff, MdCallEnd, MdRefresh } from 'react-icons/md';
import { FaMicrophoneSlash, FaMicrophone, FaPaintBrush } from 'react-icons/fa';
import Footer from '../components/Footer';
import * as handTrack from 'handtrackjs';
import Modal from 'react-bootstrap/Modal';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Peer from 'peerjs';
import Tooltip from 'react-bootstrap/Tooltip';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner'

// https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js
// https://www.andismith.com/blogs/2012/07/extending-getusermedia/


function HelpModal() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant='outline-light' onClick={handleShow}> Help? </Button>
            <Modal
                show={show}
                onHide={() => setShow(false)}
                dialogClassName='modal-100w'
                onEscapeKeyDown={() => setShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        On the landing page, you are asked to input a word, category and score,
                        if you're making a new room.
            <ul>
                            <li>
                                Word and Category: Players are asked to act or doodle words related to
                                the word and category that they entered.
                                Example: If user entered 'tree' as a word and chose 'Nouns' as category,
                                a possible word that a player can get is 'trunk'.
                </li>
                            <li>
                                Score: A value of at least 5. Player that first reaches this value wins.
                </li>
                        </ul>
            These options are available to the creator of the room. For someone joining an existing
            room, they will need to enter a code.
                <li>
                            Code: A key that is provided to the creator of the room. When the key is shared
                            with other players*, they are also able to join the room.
                </li>
            * For now, we only support two players. Future updates may include multiplayer.
            <p></p>
                        <strong>Game Mode:</strong> By default, players are in Charades mode. To switch to Pictionary, click on
            the paint icon <FaPaintBrush /> to doodle.
            <p></p>
                        <strong>Getting a New Word:</strong> To get a new word, click on the refresh icon <MdRefresh />. A new word
            will be displayed.
            <p></p>
                        <strong>Making a Guess:</strong> To guess a word, type '\guess [your guess]' into the text chat. If your guess
            is correct you will receive a point. Example: '\guess trunk' can something you type into your
            text chat, where 'trunk' is your guess.
            </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='outline-primary' onClick={() => setShow(false)}>
                        Close
            </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

class GameHeader extends React.Component {
    constructor() {
        super();
        this.state = { copyText: "Copy to Clipboard." }
    }

    ctrlC(e) {
        e.preventDefault();
        // https://stackoverflow.com/questions/56704138/i-want-to-create-a-copy-to-clipboard-using-react-js
        // copy room code to clipboard
        this.textArea.select();
        document.execCommand('copy');
        this.setState({ copyText: "Copied!" })
        // e.target.focus();
    }

    render() {
        return (
            <header style={{
                // position: 'fixed',
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
                <text /* TODO: onClick={this.props.onClick}*/><span role='img' aria-label='emoji'>🎉</span> Physical Comedy </text>
                {/* Room Code */}
                {
                    this.props.hosting ?
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
                            <text id='roomId' style={{ fontSize: '80%' }} >Room Code: {this.props.id} </text>
                            <OverlayTrigger
                                delay={{ show: 0, hide: 400 }}
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        {this.state.copyText}
                                    </Tooltip>
                                }
                            >
                                <Button variant='outline-light' style={{ fontSize: '50%', }} onClick={this.ctrlC.bind(this)}><MdContentCopy /></Button>
                            </OverlayTrigger>
                        </div>
                        : <div />
                }
                {/* Help button */}
                <HelpModal />
            </header >
        );
    }
}

class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
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
        let element = document.getElementById('messageBoard');
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
                            <code id='messageBoard' style={{
                                display: 'block',
                                height: '70vh',
                                overflow: 'scroll',
                                overflowX: 'hidden',
                                width: '100%',
                            }}>
                                {
                                    this.state.messages.map(msg => {
                                        console.log('msg', msg);
                                        switch (msg.type) {
                                            case 'admin':
                                                return (<li className='list-group list-group-flush' key={msg.name}>
                                                    <text style={{ color: '#808080' }}> >>> {msg.text} </text>
                                                </li>)
                                            default:
                                                console.log('msg.id/this.state.id/this.props.id', msg.id, '/', this.props.id);
                                                if (msg.id === this.props.id) {
                                                    return (<li className='list-group list-group-flush' key={msg.name}>
                                                        <text style={{ color: '#17b87e' }}> <strong>{msg.name}</strong>: {msg.text} </text>
                                                    </li>)
                                                }
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
                                <Form.Control
                                    value={this.state.messageText}
                                    style={{ width: '100%' }}
                                    required
                                    type='text'
                                    placeholder='Type here...'
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                            {/* <Button variant='info' type='submit'> Send </Button> */}

                        </Form>
                    </Container>

                </Col>
            </div >
        );
    }
}

function PeerVideo(props) {
    return (
        <video id={props.id} width='100' height='100' autoPlay='autoplay' className='mx-auto d-block' style={{ margin: '10px 10px', width: 'auto', }} /*onClick={props.onClick}*/></video>
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
            myPeers: props.myPeers
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
                <video id='my-camera' width='300' height='225' autoPlay='autoplay' muted={true} /*className='mx-auto d-block'*/></video>
                <canvas id='feed' ></canvas>
                <video id='peer-camera' width='300' height='225' autoPlay='autoplay' style={{ display: 'none', }} /*className='mx-auto d-block'*/></video>
                {/* <div id='peers'>
                    {this.state.myPeers.map((peer) => (
                        <div key={peer.id}>
                            {this.renderPeerVideo(peer.name)}
                        </div>
                    ))}
                </div> */}
            </Container>
        );
    }
}

class CallOptions extends React.Component {

    toggleCam() {
        this.props.toggleCam();
    }

    render() {
        return (
            <div>
                <OverlayTrigger
                    placement='top'
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>Camera {this.props.camOn ? 'On' : 'Off'}</Tooltip>}>
                    {this.props.camOn ?
                        // on
                        <Button variant='info' onClick={this.toggleCam.bind(this)} size='lg' >
                            <MdVideocam />
                        </Button>
                        :
                        // off
                        <Button variant='outline-secondary' onClick={this.toggleCam.bind(this)} size='lg' >
                            <MdVideocamOff />
                        </Button>
                    }

                </OverlayTrigger>
                <OverlayTrigger
                    placement='top'
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>{this.props.muted ? 'Muted' : 'UnMuted'}</Tooltip>}>
                    {this.props.muted ?
                        // off
                        <Button variant='outline-secondary' onClick={this.props.toggleMute} size='lg' >
                            <FaMicrophoneSlash />
                        </Button>
                        :
                        // on
                        <Button variant='info' onClick={this.props.toggleMute} size='lg' >
                            <FaMicrophone />
                        </Button>
                    }

                </OverlayTrigger>
                <OverlayTrigger
                    placement='top'
                    delay={{ show: 250, hide: 400 }}
                    // if on, show off, if off, show on
                    overlay={<Tooltip>End {this.props.hosting ? 'Room' : 'Call'}</Tooltip>}>
                    {this.props.hosting ?
                        // host
                        <Button variant='danger' onClick={this.props.endRoom} size='lg' >
                            <MdExitToApp />
                        </Button>
                        :
                        // not host
                        <Button variant='danger' onClick={this.props.endCall} size='lg' >
                            <MdCallEnd />
                        </Button>
                    }

                </OverlayTrigger>
            </div>
        );
    }
}

class GameOptions extends React.Component {

    render() {
        if (this.props.myTurn) {
            return (
                <div>
                    <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        // if on, show off, if off, show on
                        overlay={<Tooltip>Paint Mode {this.props.paintOn ? 'On' : 'Off'}</Tooltip>}>
                        {this.props.paintOn ?
                            // on
                            <Button variant='info' onClick={this.props.toggleDraw} size='lg' >
                                <FaPaintBrush />
                            </Button>
                            :
                            // off
                            <Button variant='outline-secondary' onClick={this.props.toggleDraw} size='lg' >
                                <FaPaintBrush />
                            </Button>
                        }

                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>Get Another Word</Tooltip>}>
                        <Button variant='outline-info' id='wordbutton' onClick={this.props.newWord} size='lg' ><MdRefresh /></Button>
                    </OverlayTrigger>
                    <Card>
                        <Card.Body style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', padding: '10px', }}>
                            <div>
                                {this.props.currentWord}
                            </div>
                        </Card.Body>
                    </Card>
                </div >
            );
        } else {
            return (
                <div>
                    {/* <OverlayTrigger
                        placement='top'
                        delay={{ show: 250, hide: 400 }}
                        overlay={<Tooltip>Give up?</Tooltip>}>
                        <Button variant='outline-info' id='wordbutton' onClick={this.props.skipGuess} size='lg' ><MdCompareArrows /></Button>
                    </OverlayTrigger> */}
                </div>
            );
        }
    }
}

class Room extends React.Component {
    constructor() {
        super();
        // WHEN STATE CHANGES, THE COMPONENT RERENDER, SO BE CAREFUL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!11
        this.state = {
            // peerjs
            localId: '',
            localName: '',
            hosting: null,

            // from homepage
            starterWord: '',
            category: '',
            wordsArray: [],
            winningScore: 0,
            hostId: '',

            // handtrackjs
            modelParams: {
                flipHorizontal: true,   // flip e.g for video  
                maxNumBoxes: 1,         // maximum number of boxes to detect
                iouThreshold: 0.5,      // ioU threshold for non-max suppression
                scoreThreshold: 0.9,    // confidence threshold for predictions.
            },
            model: null,
            modelLoaded: false,
            doodlecolor: '#17a2b8',
            savedlines: [],

            // buttons
            camOn: false,
            muted: true,
            paintOn: false,

            // lists
            messages: [
                {
                    id: '',
                    name: '',
                    type: 'admin',
                    text: 'Write your guess by typing \\guess and the word you guess or just send messages to your mates!',
                }
            ],

            // Game
            myTurn: true,
            currentWord: '',
            otherScore: '0',

        };

        this.myScore = 0;
        // Objects used by composite components
        this.mediaConnection = null;
        this.dataConnection = null;
        this.localStream = null;
        // TODO: move this into the myPeers object 
        this.canvasStream = null;
        this.peer_stream = null;

        this.nxpos = 300 / 2;
        this.nypos = 300 / 2;

        this.backlogMessages = [];

        // this.myPeers = [
        //     // {
        //     //     //     peerId: '',
        //     //     //     name: '',
        //     //     //     call: null,
        //     //     //     dataConnection: null,
        //     //     //     mediaConnection: null,
        //     //     //     stream: null
        //     // },
        // ];

        // Function binding
        this.adminMessage = this.adminMessage.bind(this);
        this.endRoom = this.endRoom.bind(this);
        this.endCall = this.endCall.bind(this);
        this.verifyComment = this.verifyComment.bind(this)
        this.sendMessage = this.sendMessage.bind(this);
        this.toggleMute = this.toggleMute.bind(this);
        this.toggleCam = this.toggleCam.bind(this);
        this.toggleDraw = this.toggleDraw.bind(this);
        this.newWord = this.newWord.bind(this);
        this.sendWords = this.sendWords.bind(this);
        this.getWordsArray = this.getWordsArray.bind(this);


        // create peer TODO: user proper peer server
        this.peer = new Peer();
        console.log('Current peer', this.peer.id);

        // load handtrack model
        console.log('loading model...');
        handTrack.load(this.state.modelParams).then(loadedModel => {
            this.setState({ model: loadedModel });
            this.setState({ modelLoaded: true });
            console.log('model loaded', this.state.model);
        });

        // generic error handling TODO: Clarify!!!
        this.peer.on('error', (err) => {
            switch (err.type) {
                case 'peer-unavailable': // if host not exist, alert and redirect to home
                    alert("The room you're looking to join doesn't exist... Are you sure you have the right Room Code? ");
                    console.log('redirect to homepage');
                    window.location.replace('../');
                    break;
                default:
                    alert('An error ocurred with peer: ' + err);
                    console.error(err);
                    break;
            }
        });
    }

    componentDidMount() {
        // set up peer connection to the SERVER
        this.peer.on('open', (localId) => {
            console.log('peer id', localId);
            this.setState({
                localId: localId,
                localName: localId,
            });

            if (this.props.location.state) {

                console.log('this.props.location.state', this.props.location.state);
                if (this.props.location.state.hosting) {
                    this.setState({
                        hosting: true,
                        starterWord: this.props.location.state.data.word,
                        category: this.props.location.state.data.category,
                        winningScore: parseInt(this.props.location.state.data.score),
                    });
                    this.getWordsArray();

                    // ask for camera
                    if (!this.state.camOn) {
                        this.toggleCam();
                    }
                    // wait for connections, data and media

                    // Handle the on receive data event
                    this.peer.on('connection', (dataConnection) => {
                        this.dataConnection = dataConnection;
                        // Emitted when the connection is established and ready-to-use. 
                        this.dataConnection.on('open', () => {
                            // Emitted when data is received from the remote peer.
                            this.dataConnection.on('data', (data) => {
                                // data.map((temp) => console.log('Received', temp));
                                // TODO: when message received, add to personal message list
                                data.map((temp) => {
                                    console.log("sending getting message", temp);
                                    switch (temp.type) {
                                        case 'meta': {
                                            // update score
                                            this.setState({
                                                otherScore: temp.text,
                                                myTurn: false,
                                            });
                                            break;
                                        }
                                        case 'words': {
                                            // update score
                                            this.setState({
                                                wordsArray: temp.text,
                                                currentWord: temp.word,
                                            });
                                            console.log('this.state.currentWord', this.state.currentWord);
                                            break;
                                        }
                                        default: {
                                            let tempMessages = this.state.messages;
                                            tempMessages.push(temp);
                                            this.setState({
                                                messages: tempMessages,
                                            });
                                            break;
                                        }
                                    }
                                });
                            });
                            // Send messages [is serialized by BinaryPack by default and sent to the remote peer]
                            // on connection, send wordlist to other user
                            this.sendWords();
                            if (this.state.myTurn) this.adminMessage("host, it's your turn.");
                        });
                        // Closes the data connection gracefully, cleaning up underlying DataChannels and PeerConnections.
                        // dataConnection.close();
                    });

                    // handle the on receive call event
                    this.peer.on('call', (mediaConnection) => {
                        this.mediaConnection = mediaConnection;

                        // TODO: reject call functionality: make connection, send username, add id to list, make call, accept call if on list
                        let acceptsCall = true;
                        acceptsCall = window.confirm('Videocall incoming, do you want to accept it ?');

                        if (acceptsCall) {
                            // Answer the call with your own video/audio stream
                            let video = document.getElementById('peer-camera');
                            video.style.display = 'inline-block';
                            this.mediaConnection.answer(this.canvasStream);

                            // Emitted when a remote peer adds a stream
                            this.mediaConnection.on('stream', (peer_stream) => {
                                // Store a global reference of the other user stream
                                this.peer_stream = peer_stream;
                                // Display the stream of the other user in the peer-camera video element
                                this.onReceiveStream(this.peer_stream, 'peer-camera');
                            });
                            // Handle when a remote peer ends the call
                            this.mediaConnection.on('close', () => {
                                this.endCall();
                            });

                            // // Closes the data connection gracefully, cleaning up underlying DataChannels and PeerConnections.
                            // this.mediaConnection.close();
                        } else {
                            console.log('Call denied !');
                        }
                    });

                } else {
                    this.setState({
                        hosting: false,
                        myTurn: false,
                        hostId: this.props.location.state.data.code,
                    });

                    // ask for camera
                    if (!this.state.camOn) {
                        this.toggleCam(() => {

                            // console.log('callback from toggleCam');

                            // make connection to host, data and media
                            let video = document.getElementById('peer-camera');
                            video.style.display = 'inline-block';
                            console.log('Calling to ', this.state.hostId);

                            // make connection to another peer TODO: add metadata
                            this.dataConnection = this.peer.connect(this.state.hostId, 'hi');
                            this.dataConnection.on('open', () => {
                                this.dataConnection.on('data', (data) => {
                                    // data.map((temp) => console.log('Received', temp));
                                    // TODO: when message received, add to personal message list
                                    data.map((temp) => {
                                        switch (temp.type) {
                                            case 'meta': {
                                                // update score
                                                this.setState({
                                                    otherScore: temp.text,
                                                    myTurn: false,
                                                });
                                                break;
                                            }
                                            case 'words': {
                                                // update score
                                                this.setState({
                                                    wordsArray: temp.text,
                                                    currentWord: temp.word,
                                                });
                                                console.log('this.state.currentWord', this.state.currentWord);
                                                break;
                                            }
                                            default: {
                                                let tempMessages = this.state.messages;
                                                tempMessages.push(temp);
                                                this.setState({
                                                    messages: tempMessages,
                                                });
                                                break;
                                            }
                                        }
                                    });
                                });
                                this.adminMessage('peer has joined~');
                                // this.dataConnection.send('hi!');
                            });

                            // make call to another peer TODO: what if this.canvasStream is null?
                            this.mediaConnection = this.peer.call(this.state.hostId, this.canvasStream);
                            this.mediaConnection.on('stream', (peer_stream) => {
                                this.peer_stream = peer_stream;
                                this.onReceiveStream(this.peer_stream, 'peer-camera');

                                // Handle when the call finishes
                                this.mediaConnection.on('close', () => {
                                    this.endCall();
                                });

                            });

                        });
                    }
                }
            } else {
                // was not directed from home
                console.log('redirect to homepage');
                window.location.replace('../');
            }
        });
    }

    endRoom() {
        //TODO: let all peers know to leave
        // end connections
        if (this.dataConnection) {
            this.dataConnection.close();
        }
        if (this.mediaConnection) {
            this.mediaConnection.close();
        }
        // end peer
        // TODO: on close, remove from peer list
        this.onEndStream('peer-camera');
        this.peer_stream = null;
        // end local
        if (this.state.camOn) {
            this.toggleCam();
        }
        alert('The videocall has finished');
        this.peer.destroy();
        console.log('redirect to homepage');
        window.location.replace('../');
    }

    endCall() {
        // end connections
        if (this.dataConnection) {
            this.dataConnection.close();
        }
        if (this.mediaConnection) {
            this.mediaConnection.close();
        }
        // TODO: on close, remove from peer list
        // end peer
        // TODO: on close, remove all peer list
        this.onEndStream('peer-camera');
        this.peer_stream = null;
        // end local
        if (this.state.camOn) {
            this.toggleCam();
        }
        alert('The videocall has finished');
        this.peer.destroy();
        console.log('redirect to homepage');
        window.location.replace('../');
    }

    // Handle the providen stream (video and audio) to the desired video element
    onReceiveStream(stream, element_id) {
        // Retrieve the video element according to the desired
        let video = document.getElementById(element_id);
        // Set the given stream as the video source
        // video.src = window.URL.createObjectURL(stream);
        console.log('stream', stream);
        video.srcObject = stream;
        // TODO: change this to =>
        video.onloadedmetadata = function (e) {
            video.play();
        };
    }

    // feedback loop of getting cam stream from hidden video and applying to canvas on sceen
    streamFeed(callbacks) {
        // TODO: Move these around to global variables after component mounts
        let feed = document.getElementById('feed');
        let context = feed.getContext('2d');
        let video = document.getElementById('my-camera');
        // feed.width = video.width;
        // feed.height = video.height;

        // TODO: dimensions
        feed.width = 1280 / 2;
        feed.height = 720 / 2;

        video.style.display = 'none';
        this.canvasStream = feed.captureStream();

        context.drawImage(video, 0, 0, feed.width, feed.height);

        window.requestAnimationFrame(() => {
            if (this.state.paintOn) {
                let video = document.getElementById('my-camera');
                this.runDetection(video);
                // let feed = document.getElementById('feed');
                // this.runDetection(feed);
            } else {
                this.streamFeed();
            }
        });
        if (callbacks) callbacks();
        // context.drawImage(video, 0, 0);
    }

    // Starts the request of the camera and microphone
    requestLocalVideo(callbacks) {
        console.log('requesting video');
        // // Monkeypatch for crossbrowser geusermedia
        // navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // // Request audio an video
        // navigator.getUserMedia({ audio: true, video: true }, callbacks.success, callbacks.error);

        // Older browsers might not implement mediaDevices at all, so we set an empty object first
        if (navigator.mediaDevices === undefined) {
            navigator.mediaDevices = {};
        }

        // Some browsers partially implement mediaDevices. We can't just assign an object
        // with getUserMedia as it would overwrite existing properties.
        // Here, we will just add the getUserMedia property if it's missing.
        if (navigator.mediaDevices.getUserMedia === undefined) {
            navigator.mediaDevices.getUserMedia = (constraints) => {

                // First get ahold of the legacy getUserMedia, if present
                let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

                // Some browsers just don't implement it - return a rejected promise with an error
                // to keep a consistent interface
                if (!getUserMedia) {
                    return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
                }

                // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
                return new Promise((resolve, reject) => {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        // set video to canvas on screen
        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            this.localStream = stream;
            this.onReceiveStream(stream, 'my-camera');
            callbacks ? this.streamFeed(() => callbacks()) : this.streamFeed();
        }).catch((err) => {
            alert('Cannot get access to your camera and video! Be warned that you cannot play unless your camera is on...');
            console.error(err);
            this.setState({
                camOn: false,
            });
            // TODO: handle no cam
            // this.requestLocalVideo();

        })
    }

    // when any call stream is to be removed from the screen
    onEndStream(element_id) {
        // Retrieve the video element according to the desired
        let video = document.getElementById(element_id);

        // Set the given stream as the video source
        // video.src = window.URL.createObjectURL(stream);
        video.srcObject = null;
        video.style.display = 'none';

        // // Store a global reference of the stream
        // // TODO: abstract this to peers list
        // this.peer_stream = null;

    }

    toggleCam(callbacks) {
        if (this.state.camOn) {
            // turning off
            // this.camOn = false;
            this.setState({
                camOn: false,
                muted: true
            });

            this.onEndStream('my-camera');
            this.localStream.getTracks().forEach((track) => {
                track.stop();
            });
            console.log('this.localStream', this.localStream);
        } else {
            // turning on
            // this.camOn = true;
            this.setState({
                camOn: true,
                muted: true
            });

            console.log('callbacks', callbacks);
            callbacks ? this.requestLocalVideo(() => callbacks()) : this.requestLocalVideo();
        }
    }

    // provides a list of hand position predicitons from a source
    runDetection(input) {
        // TODO: abstract these
        let feed = document.getElementById('feed');
        let video = document.getElementById('my-camera');
        let context = feed.getContext('2d');
        this.state.model.detect(input).then(predictions => {
            //   if (predictions[0]) {
            //     let midval = predictions[0].bbox[0] + (predictions[0].bbox[2] / 2)
            //     console.log('Predictions: ', inputsource.width, midval / inputsource.width);

            //   }
            // if (this.canvas.current) {
            context.drawImage(video, 0, 0, feed.width, feed.height);
            this.runDrawPredictions(predictions);
            // console.log('FPS', this.state.model.getFPS())
            // $('#fps').text('FPS: ' + model.getFPS())
            window.requestAnimationFrame(() => {
                if (this.state.paintOn) {
                    let video = document.getElementById('my-camera');

                    this.drawDoodle(context);

                    this.runDetection(video);
                    // let feed = document.getElementById('feed');
                    // this.runDetection(feed);
                } else {
                    this.streamFeed();
                }
            });
            // if (this.state.paintOn && this.canvasStream) {
            //     window.requestAnimationFrame( () => {
            //         this.runDetection();
            //     });
            // }
            // }

        });
    }

    runDrawPredictions(predictions) {
        let feed = document.getElementById('feed');
        let canvasContext = feed.getContext('2d');
        // canvasContext.clearRect(0, 0, feed.width, feed.height);
        canvasContext.save();
        // if (state.modelParams.flipHorizontal) {
        // canvasContext.scale(-1, 1);
        // canvasContext.translate(-feed.width, 0);
        // }
        canvasContext.restore();

        console.log('number of detections: ', predictions.length);
        for (let i = 0; i < predictions.length; i++) {
            // xpos = this.nxpos;
            // ypos = this.nypos;
            this.nxpos = predictions[i].bbox[0] + (predictions[i].bbox[2] / 2);
            this.nypos = predictions[i].bbox[1] + (predictions[i].bbox[3] / 2);
            // this.drawDoodle(canvasContext);
        }
    }

    drawDoodle(canvasContext) {
        let newLines = this.state.savedlines;
        // nxpos = 300 - nxpos;
        newLines.push({ xpos: 300 - this.nxpos, ypos: this.nypos });
        this.setState({ savedlines: newLines });
        console.log('newLine', newLines);
        for (let i = 1; i < newLines.length; i++) {
            // console.log('newLine', newLine);
            canvasContext.beginPath(); // begin
            canvasContext.lineWidth = 5;
            canvasContext.lineCap = 'round';
            canvasContext.strokeStyle = this.state.doodlecolor;
            canvasContext.moveTo(newLines[i - 1].xpos, newLines[i - 1].ypos); // from

            canvasContext.lineTo(newLines[i].xpos, newLines[i].ypos); // to
            canvasContext.stroke(); // draw it!
            canvasContext.closePath();
        }
    }

    // toggle gesture detection doodling on canvas
    toggleDraw() {
        this.setState({
            savedlines: [],
            paintOn: !this.state.paintOn
        });
    }

    verifyComment(message) {
        console.log('this.state.currentWord', this.state.currentWord);
        // if message.includes('\guess'), correct and my turn
        if (message.includes('\\guess') && message.includes(this.state.currentWord) && !this.state.myTurn) {
            // sendMessage
            this.sendMessage(message);
            // adminMessage
            this.adminMessage("You're right, " + (this.state.hosting ? 'host' : 'peer') + "! It's your turn now~");
            // updateScore
            this.updateScore();
            // update word list
            let tempWords = this.state.wordsArray;
            let tempWord = tempWords.pop();
            this.setState({
                wordsArray: tempWords,
                currentWord: tempWord,
            }, () => this.sendWords());
            // if my score >= winningScore
            console.log("myScore/winningScore", this.myScore.toString() + "/" + this.state.winningScore.toString());
            if (this.myScore >= this.state.winningScore) {
                // (this.state.hosting ? 'host' : 'peer') won! But you can keep playing~
                this.adminMessage((this.state.hosting ? 'host' : 'peer') + ' won! But you can keep playing~');
            }
        } else {
            this.sendMessage(message);
        }
    }

    updateScore() {
        console.log("myScore before", this.myScore.toString());
        let ms = this.myScore;
        ms++;
        this.setState({
            myScore: this.myScore++,
            myTurn: true,
        });
        this.myScore = this.myScore++;
        console.log("myScore after", this.myScore.toString());
        let temp = { id: '', name: '', type: 'meta', text: this.myScore.toString() };
        if (this.dataConnection) {
            if (this.backlogMessages) this.dataConnection.send(this.backlogMessages);
            this.dataConnection.send([temp]);
            this.backlogMessages = [];
        } else {
            this.backlogMessages.push(temp);
        }
    }

    sendWords() {
        let temp = {
            id: '', name: '', type: 'words',
            word: this.state.currentWord,
            text: this.state.wordsArray,
        };

        if (this.dataConnection) {
            if (this.backlogMessages) this.dataConnection.send(this.backlogMessages);
            this.dataConnection.send([temp]);
            this.backlogMessages = [];
        } else {
            this.backlogMessages.push(temp);
        }
    }

    sendMessage(message) {
        // push new message to my messagelist then send to others
        // TODO: add to messagelist and send to all other users
        console.log('message', message);
        let temp = { id: this.state.localId, name: (this.state.hosting ? 'host' : 'peer'), type: 'public', text: message };
        let tempMessages = this.state.messages;
        tempMessages.push(temp);
        this.setState({
            messages: tempMessages,
        })
        console.log('this.state.messages', this.state.messages);
        if (this.dataConnection) {
            if (this.backlogMessages) this.dataConnection.send(this.backlogMessages);
            this.dataConnection.send([temp]);
            this.backlogMessages = [];
        } else {
            this.backlogMessages.push(temp);
        }
    }

    adminMessage(message) {
        // push new message to my messagelist then send to others
        // TODO: add to messagelist and send to all other users
        console.log('message', message);
        let temp = { id: '', name: '', type: 'admin', text: message };
        let tempMessages = this.state.messages;
        tempMessages.push(temp);
        this.setState({
            messages: tempMessages,
        })
        if (this.dataConnection) {
            if (this.backlogMessages) this.dataConnection.send(this.backlogMessages);
            this.dataConnection.send([temp]);
            this.backlogMessages = [];
        } else {
            this.backlogMessages.push(temp);
        }
    }

    getWordsArray() {
        // /words/:type/:word
        console.log('/words/${this.state.category}/${this.state.starterWord}', `/words/${this.state.category}/${this.state.starterWord}`);
        fetch(`/words/${this.state.category}/${this.state.starterWord}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                let newWord = data.pop();
                this.setState({
                    wordsArray: data,
                    currentWord: newWord
                }, () => {
                    if (this.dataConnection) this.sendWords();
                });
            });
    }

    newWord() {
        // onClick function for word
        let words = this.state.wordsArray;
        console.log('words', words);
        let newWord;
        if (words && words.length !== 0) {
            newWord = words.pop();
            this.setState({
                currentWord: newWord,
                wordsArray: words,
            }, () => this.sendWords());
        } else {
            this.getWordsArray();
        }
        console.log('newWord', newWord);
    }

    toggleMute() {
        // line order matters here
        this.localStream.getAudioTracks()[0].enabled = this.state.muted;
        this.setState({
            muted: !this.state.muted
        });
    }

    render() {
        console.log('this.props.modelLoaded', this.state.modelLoaded);
        if (this.state.modelLoaded) {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}>
                    <GameHeader
                        id={this.state.localId}
                        hosting={this.state.hosting}
                        onClick={(this.state.hosting ? this.endRoom : this.endCall)}
                    />
                    <div id='body' className='bg-light page'
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            flex: 1,
                            paddingTop: '10px',
                            paddingBottom: '10px',
                        }}>
                        <div id='left' style={{ display: 'flex', alignItems: 'stretch', flexDirection: 'column', flexBasis: '20%', maxWidth: '20%' }}>
                            <ChatBox
                                // TODO: When peerlist update, send message to chat
                                id={this.state.localId}
                                onClick={this.verifyComment}
                                messages={this.state.messages}
                            />
                        </div>
                        <div id='right' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexBasis: '80%', maxWidth: '80%' }}>
                            <div id='top' style={{ display: 'flex', height: '100%', flexBasis: '80%', maxWidth: '100%', }}>
                                <Streams
                                    localId={this.state.localId}
                                    localName={this.state.localName}
                                    localStream={this.state.localStream}
                                    myPeers={this.myPeers}
                                />
                            </div>
                            <div id='bottom' style={{
                                display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', justifyItems: 'center', alignItems: 'center',
                                flexBasis: '20%', width: '100%', height: '100%',
                            }}>
                                <CallOptions
                                    hosting={this.state.hosting}
                                    endRoom={this.endRoom}
                                    endCall={this.endCall}
                                    muted={this.state.muted}
                                    toggleMute={this.toggleMute}
                                    camOn={this.state.camOn}
                                    toggleCam={this.toggleCam}
                                />
                                <Card>
                                    <Card.Body id='score' style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'column', padding: '10px', }}>
                                        <div>
                                            My Score: {this.myScore.toString()}
                                        </div>
                                        <div>
                                            Opponent's Score: {this.state.otherScore}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <GameOptions
                                    paintOn={this.state.paintOn}
                                    toggleDraw={this.toggleDraw}
                                    currentWord={this.state.currentWord}
                                    myTurn={this.state.myTurn}
                                    newWord={this.newWord}
                                />

                            </div>
                        </div>
                    </div>
                    <Footer></Footer>
                </ div >
            );
        } else {
            return (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        minHeight: '100vh',
                    }}>
                    <GameHeader
                        id={this.state.localId}
                        hosting={this.state.hosting}
                        onClick={(this.state.hosting ? this.endRoom : this.endCall)}
                    />
                    < div style={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "259px",
                        flex: 1,
                    }}>
                        <Spinner animation="grow" variant="info" />
                    </div>
                    <Footer></Footer>
                </ div >
            );
        }
    }
}

export default Room;
