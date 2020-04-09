import React, { useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Instructions from './Instructions';

function CardOneForm() {
    const [validate, setValidate] = useState(false);
    let enterWord = "You will be provided with words similar to the one you enter. Example, if you enter 'tree', a possible suggestion can be 'trunk'.";
    let wordCategory = "You will get words based on the category you choose.";
    let score = "Player who reaches this score first wins!";


    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidate(true);
    };

    return (
        <Form noValidate validated={validate} onSubmit={handleSubmit} action="/charades">
            {/* enter a word */}
            <Form.Group as={Col} controlId="enter-word">
                <Form.Label sm="10">Enter a word: <Instructions text={enterWord} /> </Form.Label>
                <Col sm="10">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">w</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Enter word" required />
                        <Form.Control.Feedback type="invalid">Please enter a word.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            {/* Choose a category */}
            <Form.Group as={Col} controlId="category">
                <Form.Label sm="10">Choose a word category: <Instructions text={wordCategory} /></Form.Label>
                <Col sm="10">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">c</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control as="select">
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
                <Form.Label sm="10">Score: <Instructions text={score} /> </Form.Label>
                <Col sm="10">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="number"
                            min='5'
                            placeholder="Score"
                            aria-describedby="inputGroupPrepend"
                            required
                        />
                        <Form.Control.Feedback type="invalid">Please enter a valid score.</Form.Control.Feedback>
                    </InputGroup>
                </Col>
            </Form.Group>
            <Button type="submit" variant="info">Create Room</Button>
        </Form>
    );

}

function CardTwoForm() {
    const [validate, setValidate] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidate(true);
    };

    return (
        <Form noValidate validated={validate} onSubmit={handleSubmit} action="/pictionary">
            <Form.Group as={Col} controlId="enter-word">
                <Form.Label sm="10">Enter a Code: </Form.Label>
                <Col sm="10">
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">#</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control type="text" placeholder="Enter code" required />
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

export default class Cards extends React.Component {
    createRoom = "You will be provided a code of your room on submission. Share the code with your mates.";
    joinRoom = "Enter the code your mate gave you to join their room.";

    render() {
        return (
            <div>
                <Accordion defaultActiveKey="0">
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