import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class Credits extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <h3>Credits</h3>
                <p style={{margin:"20px", fontSize:"25px"}}>
                    Thanks to these amazing projects, developing <a href="/">Physical Comedy</a> was a piece of cake <span role="img" aria-label="piece of cake">🍰</span>.
                    <ul style={{margin:"10px"}}>
                        <li> <a rel="noopener noreferrer" target="_blank" href="https://thierrysans.me/CSCC09/">CSCC09</a> Professor Thierry Sans and his Teaching Team </li>
                        <li> <a rel="noopener noreferrer" target="_blank" href="https://datamuse.com/api/">Datamuse</a></li>
                        <li> <a rel="noopener noreferrer" target="_blank" href="https://peerjs.com/">Peerjs</a> Documentation</li>
                        <li> <a rel="noopener noreferrer" target="_blank" href="http://reactjs.org/">Reactjs</a></li>
                        <li> <a rel="noopener noreferrer" target="_blank" href="https://fonts.google.com/">Google Fonts</a></li>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://react-bootstrap.netlify.com/">Bootstrap for React</a></li>
                        <li> <a rel="noopener noreferrer" target="_blank" href="https://stackoverflow.com/">Stack Overflow</a></li>
                        <li>Gesture Detection</li>
                        <li> Many <a rel="noopener noreferrer" target="_blank" href="https://hackernoon.com"> Hackernoon</a> and <a rel="noopener noreferrer" target="_blank" href="http://medium.com/"> Medium </a> Articles</li>
                        <li><a rel="noopener noreferrer" target="_blank" href="http://codepen.io/">Codepen.io </a></li>
                        <li><a rel="noopener noreferrer" target="_blank" href="https://heroku.com">Heroku</a></li>
                        {/* <li></li> Peerjs Articles? */}
                    </ul>
                </p>
                <Footer />
            </div>
        );
    }
}
