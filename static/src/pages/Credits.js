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
                        <p style={{ margin: "20px", fontSize: "20px", }}>
                            Thanks to these amazing projects, design components, UI elements and snippets of code, developing <a href="/">Physical Comedy</a> was a piece of cake <span role="img" aria-label="piece of cake">🍰</span>.
                                <ul style={{ margin: "10px" }}>
                                <Row>
                                    <Col>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://thierrysans.me/CSCC09/">CSCC09</a> Professor Thierry Sans and his Teaching Team. </li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://datamuse.com/api/">Datamuse</a>, a public API for words.</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://peerjs.com/">Peerjs</a> and <a rel="noopener noreferrer" target="_blank" href="https://www.npmjs.com/package/peer">Peer</a> Documentation.</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="http://reactjs.org/">Reactjs</a> for front-end.</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://fonts.google.com/">Google Fonts</a>.</li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="http://codepen.io/">Codepen.io </a></li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="https://react-bootstrap.netlify.com/">Bootstrap for React</a>.</li>
                                        {/* <li></li> Peerjs Articles? */}
                                    </Col>
                                    <Col>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://stackoverflow.com/">Stack Overflow</a> to help us with debugging.</li>
                                        <li> Many <a rel="noopener noreferrer" target="_blank" href="https://hackernoon.com"> Hackernoon</a> and <a rel="noopener noreferrer" target="_blank" href="http://medium.com/"> Medium </a> Articles.</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://github.com/ourcodeworld/videochat-peerjs-example/blob/master/public/source/js/script.js">Video Chat</a> Peerjs Example and <a rel="noopener noreferrer" target="_blank" href="https://www.andismith.com/blogs/2012/07/extending-getusermedia/">Andi Smith's</a> Articled </li>
                                        <li><a rel="noopener noreferrer" target="_blank" href="https://heroku.com">Heroku</a> and <a rel="noopener noreferrer" target="_blank" href="https://daveceddia.com/deploy-react-express-app-heroku/"> Dave Ceddia's</a> article on deployment of React and Express Applications.</li>
                                        <li> <a rel="noopener noreferrer" target="_blank" href="https://heroku.com">Gesture Detection</a>, a npm package to help us with gesture detection.</li>
                                        {/* <li></li> Peerjs Articles? */}
                                    </Col>
                                </Row>
                            </ul>
                        </p>
                    </Col>
                </div>
                <Footer />
            </div>
        );
    }
}
