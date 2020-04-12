import React from 'react';

const header = {
    padding: '20px',
    textAlign: 'center',
    background: '#17a2b8',
    color: 'white',
    fontSize: '30px'
};

const text = {
    flexDirection: 'column',
    color: 'white',
    padding: '0px',
};

export default class Header extends React.Component {

    render() {
        return (
            <header style={header}>
                <div style={text}>
                    <span role="img" aria-label="emoji">🎉</span> <a href="/" style={text}>Physical Comedy</a>
                </div>
            </header>
        )
    }
}
