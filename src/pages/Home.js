import React from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header'

export default class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <Header></Header>
                <div className="body" style={{ display: 'flex', flexDirection: 'column-reverse', alignItems: 'center', margin: '60px' }}>
                    <Cards></Cards>
                </div>
                <Footer></Footer>
            </div>
        );
    }
}