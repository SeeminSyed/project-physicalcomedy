import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup'
// import Row from 'react-bootstrap/Row';


export default class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            validate: 'null'
        };
    }

    handleSubmit(event) {
        console.log(event);
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            this.setState({ validate: 'false' });
            event.preventDefault();
            event.stopPropagation();

        }

        // this.setState({ validate: 'true' });
        
    }
    render() {
        return (
            <div className="App">
                <Card border="info" style={{ width: '500px', margin: '10px' }}>
                    <Card.Header>Create a new Room!</Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Create a new room and get your friends to join in!
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
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a word.
                                        </Form.Control.Feedback>
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
                                            <Form.Control.Feedback type="invalid">
                                                Please choose an option.
                                        </Form.Control.Feedback>
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
                                            <Form.Control.Feedback type="invalid">
                                                Please enter a valid score.
                                        </Form.Control.Feedback>
                                        </InputGroup>
                                    </Col>
                                </Form.Group>
                                <Button type="submit" variant="primary">Create Room</Button>
                            </Form>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}