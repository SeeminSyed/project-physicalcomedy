import React from 'react';
import '../custom.css'

const footer = {
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#e2e2e2',
    color: 'black',
    textAlign: 'center',
    padding: '5px',
};

const text = {
    flexDirection: 'column',
    textAlign: 'center',
};

export default class Footer extends React.Component {

    render() {
        return (
            <footer style={footer}>
                <text style={text}>
                    Find the source code at <a rel="noopener noreferrer" target="_blank" href="https://github.com/UTSCC09/project-physicalcomedy">Github</a> |
                    Credits at <a href="/credits"> Credits</a>
                </text>
            </footer>
        )
    }
}