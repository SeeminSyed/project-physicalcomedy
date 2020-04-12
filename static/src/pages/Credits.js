import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../custom.css'

export default class Credits extends React.Component {
    render() {
        return (
            <div className="App"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                }} >
                <Header />
                <div
                    style={{
                        display: 'flex',
                        justifyItems: 'center',
                        justifyContent: 'center',
                        marginLeft: '10%',
                        marginRight: '10%',
                        marginBottom: '30px',
                        flex: 1,
                    }}>
                    <Col>
                        <h3>Credits</h3>
                        <div style={{ margin: "20px", fontSize: "20px", }}>
                            Thanks to these amazing projects, design components, UI elements and snippets of code, developing <a href="/">Physical Comedy</a> was a piece of cake <span role="img" aria-label="piece of cake">🍰</span>.
                                <ul style={{ margin: "10px" }}>
                                <Row>
                                    <Col>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://thierrysans.me/CSCC09/">CSCC09</a> Professor Thierry Sans and his Teaching Team </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://datamuse.com/api/">Datamuse</a></li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://peerjs.com/">Peerjs</a> Documentation</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="http://reactjs.org/">Reactjs</a></li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://fonts.google.com/">Google Fonts</a></li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="https://react-bootstrap.netlify.com/">Bootstrap for React</a></li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://stackoverflow.com/">Stack Overflow</a></li>
                                        <li> Many <a rel="noopener noreferrer" target="_blank" href="https://hackernoon.com"> Hackernoon</a> and <a rel="noopener noreferrer" target="_blank" href="http://medium.com/"> Medium </a> Articles</li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="http://codepen.io/">Codepen.io </a></li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="https://heroku.com">Heroku</a> and <a rel="noopener noreferrer" target="_blank" href="https://daveceddia.com/deploy-react-express-app-heroku/"> Dave Ceddia's</a> article on deployment of React and Express Applications</li>
                                        <li>Gesture Detection, our npm packages</li>
                                    </Col>
                                    <Col>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="/"></a> https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="/"></a> https://www.andismith.com/blogs/2012/07/extending-getusermedia/ </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="/"></a> https://stackoverflow.com/questions/56704138/i-want-to-create-a-copy-to-clipboard-using-react-js </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="/"></a> https://www.cometchat.com/tutorials/build-an-anonymous-chat-app-with-react-react-bootstrap/ </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="/"></a> https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia basically developer.mozilla site </li>
                                        
                                    </Col>
                                </Row>
                            </ul>
                        </div>
                    </Col>
                </div>
                <Footer />
            </div>
        );
    }
}
