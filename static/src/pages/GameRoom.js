import React from 'react';
import Footer from '../components/Footer';
import Room from '../components/Room'

export default class GameRoom extends React.Component {
    render() {
        return (
            <div className="App">
                <Room></Room>
                <Footer></Footer>
            </div >
        );
    }
}