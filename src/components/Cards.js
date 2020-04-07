import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'

export default class Cards extends React.Component {
    constructor() {
        super();
        this.state = {
            validate: 'null'
        };
    }

    handleSubmit(event) { // TODO: fix this
        console.log(event);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({ validate: 'false' });
            event.preventDefault();
            event.stopPropagation();

        }
        this.setState({ validate: 'true' });
    }

    render() {
        return (
            <Accordion defaultActiveKey="0">
                {/* Create a room */}
                <Card border="info" style={{ width: '500px', margin: '10px' }}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="0">
                            Create a new Room!
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            <Card.Text>
                                Create a new room and get your mates to join in!
                                    <Form validated={this.state.validate} onSubmit={this.handleSubmit}>
                                    {/* enter a word */}
                                    <Form.Group as={Col} controlId="enter-word">
                                        <Form.Label sm="10">Enter a word:</Form.Label>
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
                                        <Form.Label sm="10">Choose a word category:</Form.Label>
                                        <Col sm="10">
                                            <InputGroup>
                                                <InputGroup.Prepend>
                                                    <InputGroup.Text id="inputGroupPrepend">c</InputGroup.Text>
                                                </InputGroup.Prepend>
                                                <Form.Control as="select">
                                                    <option>Nouns</option>
                                                    <option>Adjectives</option>
                                                    <option>Verbs</option>
                                                    <option>Adverbs</option>
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
                                        <Form.Label sm="10">Score:</Form.Label>
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
                                    <Button type="submit" href="/charades" variant="primary">Create Room</Button>
                                </Form>
                            </Card.Text>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
                {/* Join a room */}
                <Card border="info" style={{ width: '500px', margin: '10px' }}>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Join a Room!
                            </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            <Card.Text>
                                Join a room and start playing with your mates!
                        </Card.Text>
                            <Form>
                                <Form.Group as={Col} controlId="enter-word">
                                    <Form.Label sm="10">Enter a Code:</Form.Label>
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
                            </Form>
                            <Button type="submit" href="/pictionary" variant="primary">Join a Room!</Button>
                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}