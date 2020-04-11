import React from 'react';
import { MdHelp } from 'react-icons/md';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default class Instructions extends React.Component {
    render() {
        return (
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={<Tooltip id="button-tooltip"> {this.props.text} </Tooltip>}>
                <MdHelp style={{ color: '#808080' }} >Need Help?</MdHelp>
            </OverlayTrigger>
        );
    }
}