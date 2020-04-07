import React from 'react';

const footer = {
    position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    height: '5%',
    backgroundColor: '#e2e2e2',
    color: 'black',
    textAlign: 'center'
};

const text = {
    flexDirection: 'column',
    padding: '25px'
};

export default class Footer extends React.Component {

    render() {
        return (
            <footer style={footer}>
                <text style={text}>
                    Find the source code at <a rel="noopener noreferrer" target="_blank" href="https://github.com/UTSCC09/project-physicalcomedy">Github</a> |
                    <a href="/credits"> Credits</a>
                </text>
            </footer>
        )
    }
}