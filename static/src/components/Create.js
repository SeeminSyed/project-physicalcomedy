import React from 'react';
import Peer from 'peerjs';
// https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js

// css for this component
const style = {
    display: 'flex',
    margin: '20px 20px',
    flexDirection: 'column',
    flexGrow: '1',
    fontWeight: '300',
    fontSize: '200%',
};

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

class Create extends React.Component {
    constructor() {
        super();
        this.state = { id: '', peerid: '', value: '' };
        // this.connect = this.connect.bind(this);
        this.onEndStream = this.onEndStream.bind(this);
        this.onReceiveStream = this.onReceiveStream.bind(this);
        this.requestLocalVideo = this.requestLocalVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.camOpen = this.camOpen.bind(this);
        this.camClose = this.camClose.bind(this);
        this.endCall = this.endCall.bind(this);
        this.peer_stream = null;
        this.localStream = null;
        this.call = null;

        // reciever is the id that other peers will use to connect to this peer
        this.peer = new Peer();
        console.log("peer", this.peer);
        // this.connect();
    }

    // Starts the request of the camera and microphone
    requestLocalVideo(callbacks) {

        // TODO: Backwards compatability
        // if (navigator.mediaDevices === undefined) {
        //     navigator.mediaDevices = {};
        // }

        // if (navigator.mediaDevices.getUserMedia === undefined) {
        //     navigator.mediaDevices.getUserMedia = (constraints) => {

        //         // First get ahold of the legacy getUserMedia, if present
        //         let getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        //         // Some browsers just don't implement it - return a rejected promise with an error
        //         // to keep a consistent interface
        //         if (!getUserMedia) {
        //             return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        //         }

        //         // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        //         return new Promise(function (resolve, reject) {
        //             getUserMedia.call(navigator, constraints, resolve, reject);
        //         });
        //     }
        // }

        navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

        // Request audio an video
        navigator.getUserMedia({ audio: true, video: true }, callbacks.success, callbacks.error);

    }

    // Handle the providen stream (video and audio) to the desired video element
    onReceiveStream(stream, element_id) {
        // Retrieve the video element according to the desired
        let video = document.getElementById(element_id);
        // Set the given stream as the video source
        // video.src = window.URL.createObjectURL(stream);
        video.srcObject = stream;

        // Store a global reference of the stream
        this.peer_stream = stream;
    }

    onEndStream(element_id) {
        // Retrieve the video element according to the desired
        let video = document.getElementById(element_id);
        // Set the given stream as the video source
        // video.src = window.URL.createObjectURL(stream);
        video.srcObject = null;

        // Store a global reference of the stream
        this.peer_stream = null;

    }

    handleSubmit(event) {
        event.preventDefault();
        // console.log('A value was submitted: ' + this.state.value);
        // console.log('Connecting to a new peer ', "receiver", " to say hi!");

        // Request a videocall the other user
        // document.getElementById("call").addEventListener("click", () => {
        console.log('Calling to ' + this.state.value);
        let a = JSON.parse(JSON.stringify(this.state.value));
        console.log(this.peer);

        let call = this.peer.call(this.state.value, this.localStream);
        this.setState({
            peerid: a
        });

        call.on('stream', (stream) => {
            this.peer_stream = stream;

            this.onReceiveStream(stream, 'peer-camera');
        });
        // }, false);

        // On click the connect button, initialize connection with peer
        // document.getElementById("connect-to-peer-btn").addEventListener("click", () => {
        // username = document.getElementById("name").value;
        // peer_id = document.getElementById("peer_id").value;

        // if (this.state.value) {
        //     conn = this.peer.connect(this.state.value, {
        //         metadata: {
        //             'username': username
        //         }
        //     });

        //     conn.on('data', handleMessage);
        // } else {
        //     alert("You need to provide a peer to connect with !");
        //     return false;
        // }

        // document.getElementById("chat").className = "";
        // document.getElementById("connection-form").className += " hidden";
        // }, false);

    }

    camOpen() {
        // Initialize application by requesting your own video to test !
        this.requestLocalVideo({
            success: (stream) => {
                this.localStream = stream;
                this.onReceiveStream(stream, 'my-camera');
            },
            error: (err) => {
                alert("Cannot get access to your camera and video !");
                console.error(err);
            }
        });
    }

    camClose() {
        this.onEndStream('my-camera');
        this.localStream.getTracks().forEach((track) => {
            track.stop();
        });
    }

    endCall() {
        this.onEndStream('peer-camera');
        this.call.close();
        // this.peer_stream.getTracks().forEach((track) => {
        //     track.stop();
        // });
    }

    // recieve connections
    componentDidMount() {

        // // Initialize application by requesting your own video to test !
        // this.requestLocalVideo({
        //     success: (stream) => {
        //         this.localStream = stream;
        //         this.onReceiveStream(stream, 'my-camera');
        //     },
        //     error: (err) => {
        //         alert("Cannot get access to your camera and video !");
        //         console.error(err);
        //     }
        // });

        // Show your ID, that allows other user to connect to your session.
        this.peer.on('open', (id) => {
            // console.log("peer.id", id);
            this.setState({
                id: id
            });
        });

        // // When someone connects to your session:
        // this.peer.on('connection', (connection) => {
        //     let conn = connection;

        //     // Use the handleMessage to callback when a message comes in
        //     conn.on('data', this.handleMessage());

        //     // Hide peer_id field and set the incoming peer id as value
        // });

        this.peer.on('error', (err) => {
            alert("An error ocurred with peer: " + err);
            console.error(err);
        });

        // Handle the on receive call event
        this.peer.on('call', (call) => {
            this.camOpen();
            this.call = call;
            // let acceptsCall = confirm("Videocall incoming, do you want to accept it ?");
            let acceptsCall = true;

            if (acceptsCall) {
                // Answer the call with your own video/audio stream
                call.answer(this.localStream);

                // Receive data
                call.on('stream', (stream) => {
                    // Store a global reference of the other user stream
                    this.peer_stream = stream;
                    // Display the stream of the other user in the peer-camera video element !
                    this.onReceiveStream(stream, 'peer-camera');
                });

                // Handle when the call finishes
                call.on('close', () => {
                    alert("The videocall has finished");
                    // this.onEndStream('my-camera');
                    // this.onEndStream('peer-camera');   
                    this.endCall();
                });

                // use call.close() to finish a call
            } else {
                console.log("Call denied !");
            }
        });

    }

    // show the incoming video stream
    handleChange(event) {
        this.setState({ value: event.target.value });
    }


    render() {
        // render the stream here
        return (<div>
            <div className="peer-id" id="peer-id-form" style={style}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Peer ID:
                            <input style={input} type="text" value={this.state.value} onChange={this.handleChange} required />
                    </label>
                    <button style={button} type="submit">Connect</button>
                </form>
            </div>

            <div className="peer" style={style}>Peer id: {this.state.id} </div>
            <button style={button} onClick={this.camOpen} type="submit">Turn on camera</button>
            <button style={button} onClick={this.camClose} type="submit">Turn off camera</button>
            <button style={button} onClick={this.endCall} type="submit">End Call</button>
            <div>
                <video id="my-camera" width="300" height="300" autoPlay="autoplay" muted={true} className="mx-auto d-block"></video>
                <label>Id: {this.state.id} </label>
            </div>
            <div>
                <video id="peer-camera" width="300" height="300" autoPlay="autoplay" className="mx-auto d-block"></video>
                <label>Peer id: {this.state.value}</label>
            </div>
        </div>);
    }
}
export default Create