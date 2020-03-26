import React from 'react';
import Peer from 'peerjs';
import * as handTrack from "handtrackjs";
import Words from './Words';


// https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js
// https://www.andismith.com/blogs/2012/07/extending-getusermedia/
// handtrack.js
// TODO: PRoperly cite 

// let xpos = 0;
// let ypos = 0;
let nxpos = 0
let nypos = 0;

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

class DoodlePeer extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            value: '',
            modelParams: {
                flipHorizontal: true,   // flip e.g for video  
                maxNumBoxes: 1,        // maximum number of boxes to detect
                iouThreshold: 0.5,      // ioU threshold for non-max suppression
                scoreThreshold: 0.9,    // confidence threshold for predictions.
            },
            model: null,
            modelLoaded: false,
            doodler: false,
            // showHighlight: false,
            // highlightText: "Attention needed",
            doodlecolor: "#1780DC",
            // saveddoodles: []
            savedlines: []
        };
        // this.connect = this.connect.bind(this);
        this.onReceiveStream = this.onReceiveStream.bind(this);
        this.requestLocalVideo = this.requestLocalVideo.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.streamFeed = this.streamFeed.bind(this);

        this.runDetection = this.runDetection.bind(this);
        this.drawDoodle = this.drawDoodle.bind(this);
        this.runDrawPredictions = this.runDrawPredictions.bind(this);

        this.peer_stream = null;
        this.localStream = null;
        this.canvasStream = null;


        // this.feed = React.createRef();

        // reciever is the id that other peers will use to connect to this peer
        this.peer = new Peer();
        console.log("peer", this.peer);
        // this.connect();
    }


    componentWillUnmount() {
        console.log("Page unmounting disposing model")
        this.state.model.dispose();
        this.peer.disconnect();
        this.peer.destroy();
    }

    // on component mounting, set connections and events
    componentDidMount() {
        let video = document.getElementById('peer-camera');
        video.style.display = 'none';

        // this.video.current.width = this.media.width
        // this.video.current.height = this.media.height;
        nxpos = 300 / 2;
        nypos = 225 / 2;

        // this.cav = document.getElementById("canvas")
        // this.cav.width = 450
        // this.cav.height = 380
        // this.canvasContext = this.cav.getContext('2d')
        // this.DoodleCenter = true
        // console.log(this.canvas.current)
        console.log("loading model...")
        handTrack.load(this.state.modelParams).then(loadedModel => {
            this.setState({ model: loadedModel })
            this.setState({ modelLoaded: true })
            console.log("model loaded", this.state)
            this.setState({ modelLoaded: true })
        });
        this.setState({ modelLoaded: true })

        // Initialize application by requesting your own video to test !
        this.requestLocalVideo();

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
                video.style.display = 'inline-block';
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
                return new Promise(function (resolve, reject) {
                    getUserMedia.call(navigator, constraints, resolve, reject);
                });
            }
        }

        navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
            this.localStream = stream;
            this.onReceiveStream(stream, 'my-camera');
            this.streamFeed();
        }).catch((err) => {
            alert("Cannot get access to your camera and video !");
            console.error(err);

        })
    }

    // Handle the providen stream (video and audio) to the desired video element
    onReceiveStream(stream, element_id) {
        // Retrieve the video element according to the desired
        let video = document.getElementById(element_id);
        // Set the given stream as the video source
        // video.src = window.URL.createObjectURL(stream);
        console.log('stream', stream);
        video.srcObject = stream;
        video.onloadedmetadata = function (e) {
            video.play();
        };
    }

    // provides a list of hand position predicitons from a source
    runDetection(input) {
        // let self = this

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
            // console.log("FPS", this.state.model.getFPS())
            // $("#fps").text("FPS: " + model.getFPS())
            window.requestAnimationFrame(() => {
                if (this.state.doodler) {
                    let video = document.getElementById('my-camera');

                    this.drawDoodle(context);

                    this.runDetection(video);
                    // let feed = document.getElementById('feed');
                    // this.runDetection(feed);
                } else {
                    this.streamFeed();
                }
            });
            // if (this.state.doodler && this.canvasStream) {
            //     window.requestAnimationFrame(function () {
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
            // xpos = nxpos;
            // ypos = nypos;
            nxpos = predictions[i].bbox[0] + (predictions[i].bbox[2] / 2);
            nypos = predictions[i].bbox[1] + (predictions[i].bbox[3] / 2);
            // this.drawDoodle(canvasContext);
        }
    }

    drawDoodle(canvasContext) {
        let a = this.state.savedlines;
        // nxpos = 300 - nxpos;
        a.push({ xpos: 300 - nxpos, ypos: nypos });
        this.setState({ savedlines: a });
        console.log("a", a);
        for (let i = 1; i < a.length; i++) {
            // console.log("a", a);
            canvasContext.beginPath(); // begin
            canvasContext.lineWidth = 5;
            canvasContext.lineCap = 'round';
            canvasContext.strokeStyle = this.state.doodlecolor;
            canvasContext.moveTo(a[i - 1].xpos, a[i - 1].ypos); // from

            canvasContext.lineTo(a[i].xpos, a[i].ypos); // to
            canvasContext.stroke(); // draw it!
            canvasContext.closePath();
        }
    }

    // feedback loop of getting cam stream from hidden video and applying to canvas on sceen
    streamFeed() {
        // TODO: Move these around to global variables after component mounts
        let feed = document.getElementById('feed');
        let context = feed.getContext('2d');
        let video = document.getElementById('my-camera');
        feed.width = video.width;
        feed.height = video.height;
        video.style.display = 'none';
        this.canvasStream = feed.captureStream();

        context.drawImage(video, 0, 0, feed.width, feed.height);

        window.requestAnimationFrame(() => {
            if (this.state.doodler) {
                let video = document.getElementById('my-camera');
                this.runDetection(video);
                // let feed = document.getElementById('feed');
                // this.runDetection(feed);
            } else {
                this.streamFeed();
            }
        });
        // context.drawImage(video, 0, 0);
    }

    // on button click, start gesture detection doodling on canvas
    videoButtonClick(e) {
        // let self = this;
        this.setState({ savedlines: [] });
        if (this.state.doodler) {
            this.setState({ doodler: false });
            // this.streamFeed();
            // handTrack.stopVideo()
        } else {
            this.setState({ doodler: true });

            // let feed = document.getElementById('feed');
            // let context = feed.getContext('2d');
            // context.clearRect(0, 0, feed.width, feed.height);


            // handTrack.startVideo(this.video.current).then(function (status) {
            // if (status) {
            // self.setState({ videoPlayStatus: true })
            // this.runDetection();
            // } else {
            // console.log("Camera not available")
            // self.setState({ highlightText: "Please enable camera to use video detection" })
            // self.setState({ showHighlight: true })
            // setTimeout(() => {
            // self.setState({ showHighlight: false })
            // }, 6000);
            // }
            // })
        }
    }

    // when peer key submitted, call should start and associated event listeners should be set
    handleSubmit(event) {
        event.preventDefault();
        // Request a videocall the other user
        console.log('Calling to ' + this.state.value);
        console.log(this.peer);
        let video = document.getElementById('peer-camera');
        video.style.display = 'inline-block';
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
            <Words></Words>
            <button id="videobutton" style={button} onClick={this.videoButtonClick.bind(this)} >  {this.state.doodler ? "▩ Stop Video Doodle" : " ▶ ️ Start Video Doodle"} </button>
            <video id="my-camera" /*style={vid}*/ width="300" height="225" autoPlay="autoplay" muted={true} /*className="mx-auto d-block"*/></video>
            <canvas /*ref={this.feed}*/ id="feed"></canvas>
            <video id="peer-camera" width="300" height="225" autoPlay="autoplay" /*className="mx-auto d-block"*/></video>
        </div >);
    }
    //     render() {
    //         return <h1>Receive</h1>
    //     }
}
export default DoodlePeer;
