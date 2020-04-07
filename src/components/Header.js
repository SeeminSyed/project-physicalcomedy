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
    padding: '25px'
};

export default class Header extends React.Component {

    render() {
        return (
            <header style={header}>
                <text style={text}>
                <span role="img" aria-label="emoji">🎉</span> Physical Comedy
                </text>
            </header>
        )
    }
}
