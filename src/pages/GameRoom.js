import React from 'react';
import Footer from '../components/Footer';
import Room from '../components/Room'
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

export default class GameRoom extends React.Component {
    render() {
        return (
            <div className="App">
                {/* <div className="body" style={{ display: 'flex', flexDirection: 'column-reverse', marginBottom: "0px", height: '100%'}}> */}
                    <Room></Room>
                {/* </div> */}
                <Footer></Footer>
            </div >
        );
    }
}