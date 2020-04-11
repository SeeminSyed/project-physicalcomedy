import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Instructions from './Instructions';
import { Redirect } from 'react-router';
import ReactDOM from 'react-dom';

let data = { word: '', category: 'Nouns', score: '', code: '' };

class CardOneForm extends React.Component {

    constructor(props) {
        super(props);
        this.wordInput = React.createRef();
        this.categoryInput = React.createRef();
        this.scoreInput = React.createRef();

        this.validate = false;
        this.redirect = false;


        this.enterWord = "You will be provided with words similar to the one you enter. Example, if you enter 'tree', a possible suggestion can be 'trunk'.";
        this.wordCategory = "You will get words based on the category you choose.";
        this.score = "Player who reaches this score first wins!";
    }


    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.redirect = true;
        }

        this.validate = true;

        if (this.redirect) {
            if (this.wordInput) data.word = this.wordInput.current.value;
            if (this.categoryInput) data.category = this.categoryInput.current.value;
            if (this.scoreInput) data.score = this.scoreInput.current.value;
            return <Redirect push to={{
                pathname: '/room',
                state: {
                    hosting: true,
                    data: data,
                }
            }} />;
            // console.log('data', data);
        }
    }

    render() {
        return (
            <Form noValidate validated={this.validate} onSubmit={this.handleSubmit.bind(this)}>
                {/* enter a word */}
                <Form.Group as={Col} controlId="enter-word">
                    <Form.Label sm="10">Enter a word: <Instructions text={this.enterWord} /> </Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">w</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Enter word"
                                ref={this.wordInput}
                                required
                            />
                            <Form.Control.Feedback type="invalid">Please enter a word.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
                {/* Choose a category */}
                <Form.Group as={Col} controlId="category">
                    <Form.Label sm="10">Choose a word category: <Instructions text={this.wordCategory} /></Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">c</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                as="select"
                                ref={this.categoryInput}
                            >
                                <option>Nouns</option>
                                <option>Adjectives</option>
                                <option>Synonyms</option>
                                <option>Antonyms</option>
                                <option>Rhymes</option>
                                <option>Homophones</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">Please choose an option.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
                {/* Score */}
                <Form.Group as={Col} controlId="score">
                    <Form.Label sm="10">Score: <Instructions text={this.score} /> </Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="number"
                                min='1'
                                placeholder="Score"
                                aria-describedby="inputGroupPrepend"
                                required
                                ref={this.scoreInput}
                            />
                            <Form.Control.Feedback type="invalid">Please enter a valid score.</Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="info">Create Room</Button>
            </Form>
        );
    }

}

class CardTwoForm extends React.Component {
    constructor(props) {
        super(props);
        this.codeInput = React.createRef();

        this.validate = false;
        this.redirect = false;
    }

    handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.redirect = true;
        }

        this.validate = true;

        if (this.redirect) {
            if (this.codeInput) data.code = this.codeInput.current.value;
            return <Redirect push to={{
                pathname: '/room',
                state: {
                    hosting: false,
                    data: data,
                }
            }} />;
            // console.log('data', data);
        }
    }

    render() {
        return (
            <Form noValidate validated={this.validate} onSubmit={this.handleSubmit.bind(this)}>
                <Form.Group as={Col} controlId="enter-word">
                    <Form.Label sm="10">Enter a Code: </Form.Label>
                    <Col sm="10">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control
                                type="text"
                                placeholder="Enter code"
                                required
                                ref={this.codeInput}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please enter a code.
                        </Form.Control.Feedback>
                        </InputGroup>
                    </Col>
                </Form.Group>
                <Button type="submit" variant="info">Join a Room!</Button>
            </Form>
        );
    }
}

export default class Cards extends React.Component {
    createRoom = "You will be provided a code of your room on submission. Share the code with your mates.";
    joinRoom = "Enter the code your mate gave you to join their room.";

    render() {
        return (
            <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', marginLeft: '10%', marginRight: '10%', marginBottom: '30px', flexWrap: 'wrap' }}>
                <Accordion defaultActiveKey="1">
                    {/* Create a room */}
                    <Card border="info" style={{ width: '500px', margin: '10px' }}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" style={{ color: '#17a2b8' }} eventKey="0">
                                Create a new Room! <Instructions text={this.createRoom} />
                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <Card.Text>
                                    Create a new room and get your mates to join in!
                                    <CardOneForm />
                                </Card.Text>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                <Accordion defaultActiveKey="0">
                    {/* Join a room */}
                    <Card border="info" style={{ width: '500px', margin: '10px' }}>
                        <Card.Header>
                            <Accordion.Toggle as={Button} variant="link" style={{ color: '#17a2b8' }} eventKey="1">
                                Join a Room! <Instructions text={this.joinRoom} />

                            </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                            <Card.Body>
                                <Card.Text>
                                    Join a room and start playing with your mates!
                        </Card.Text>
                                <CardTwoForm />
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            </div>
        );
    }
}