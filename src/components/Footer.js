import React from 'react';
import '../custom.css'

const footer = {
    // position: 'fixed',
    left: '0',
    bottom: '0',
    width: '100%',
    backgroundColor: '#e2e2e2',
    color: 'black',
    textAlign: 'center',
    padding: '5px',
    // flex: '0 0 50px',/*or just height:50px;*/
    // marginTop: 'auto'
    // position: 'absolute',
    // bottom: 0,
    // width: '100%',
    // height: '2.5rem',
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
                    And credits at <a href="/credits"> Credits</a>
                </text>
            </footer>
        )
    }
}