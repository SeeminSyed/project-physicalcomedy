import React from 'react';
import Cards from '../components/Cards';
import Footer from '../components/Footer';
import Header from '../components/Header'

export default class Home extends React.Component {
    render() {
        return (
            <div className="App">
                <Header />
                <div className="body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '60px' }}>
                    <Cards />
                </div>
                <Footer />
            </div>
        );
    }
}