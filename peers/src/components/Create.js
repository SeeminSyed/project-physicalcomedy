import React from 'react';
import Peer from 'peerjs';
// https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js
// https://www.andismith.com/blogs/2012/07/extending-getusermedia/
// handtrack.js
// TODO: PRoperly cite 

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
        this.state = { id: '', value: '' };
        // this.connect = this.connect.bind(this);
        this.onReceiveStream = this.onReceiveStream.bind(this);
        this.requestLocalVideo = this.requestLocalVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.streamFeed = this.streamFeed.bind(this);

        this.peer_stream = null;
        this.localStream = null;
        this.canvasStream = null;


        // this.feed = React.createRef();

        // reciever is the id that other peers will use to connect to this peer
        this.peer = new Peer();
        console.log("peer", this.peer);
        // this.connect();
    }

    // Starts the request of the camera and microphone
    requestLocalVideo(callbacks) {
        // Monkeypatch for crossbrowser geusermedia
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
    }

    streamFeed() {
        let feed = document.getElementById('feed');
        let context = feed.getContext('2d');
        let video = document.getElementById('my-camera');
        feed.width = video.width;
        feed.height = video.height;
        video.style.display = 'none';
        this.canvasStream = feed.captureStream();
        window.requestAnimationFrame(() =>
            this.streamFeed()
        );
        context.drawImage(video, 0, 0, feed.width, feed.height);
        // context.drawImage(video, 0, 0);
    }

    handleSubmit(event) {
        event.preventDefault();
        // Request a videocall the other user
        console.log('Calling to ' + this.state.value);
        console.log(this.peer);
        let video = document.getElementById('peer-camera');
        video.style.display = 'block';
        let call = this.peer.call(this.state.value, this.canvasStream);

        call.on('stream', (stream) => {
            this.peer_stream = stream;
            this.onReceiveStream(stream, 'peer-camera');

            // Handle when the call finishes
            call.on('close', () => {
                alert("The videocall has finished");
                let video = document.getElementById('peer-camera');
                video.style.display = 'none';
            });

        });
    }

    // recieve connections
    componentDidMount() {

        let video = document.getElementById('peer-camera');
        video.style.display = 'none';

        // Initialize application by requesting your own video to test !
        this.requestLocalVideo({
            success: (stream) => {
                this.localStream = stream;
                this.onReceiveStream(stream, 'my-camera');
                this.streamFeed();
            },
            error: (err) => {
                alert("Cannot get access to your camera and video !");
                console.error(err);
            }
        });

        // Show the ID that allows other user to connect to your session.
        this.peer.on('open', (id) => {
            // console.log("peer.id", id);
            this.setState({
                id: id
            });
        });

        this.peer.on('error', (err) => {
            alert("An error ocurred with peer: " + err);
            console.error(err);
        });

        // Handle the on receive call event
        this.peer.on('call', (call) => {
            // let acceptsCall = confirm("Videocall incoming, do you want to accept it ?");
            let acceptsCall = true;

            if (acceptsCall) {
                // Answer the call with your own video/audio stream
                let video = document.getElementById('peer-camera');
                video.style.display = 'block';
                call.answer(this.canvasStream);

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
                    let video = document.getElementById('peer-camera');
                    video.style.display = 'none';
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
        // console.log(this.peer.id);
        return (<div>
            <div className="peer-id" id="peer-id-form" style={style}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter Peer ID:
                            <input style={input} type="text" value={this.state.value} onChange={this.handleChange} required />
                    </label>
                    <button style={button} type="submit">Submit</button>
                </form>
            </div>
            <div className="peer" style={style}>Peer id: {this.state.id} </div>
            <video id="my-camera" width="300" height="225" autoPlay="autoplay" muted={true} className="mx-auto d-block"></video>
            <canvas /*ref={this.feed}*/ id="feed"></canvas>
            <video id="peer-camera" width="300" height="225" autoPlay="autoplay" className="mx-auto d-block"></video>
        </div>);
    }
    //     render() {
    //         return <h1>Receive</h1>
    //     }
}
export default Create
