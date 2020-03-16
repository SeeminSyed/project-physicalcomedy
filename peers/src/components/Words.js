import React from 'react'
const datamuse = require('datamuse');

const words = [];

export default class Words extends React.Component {
    constructor() {
        super();
        this.state = {word: ''}; // holds the recently popped word
        this.getWords(); // populates words
        this.handleClick = this.handleClick.bind(this);
    }
    getWords() {
        // adjectives related to beach
        datamuse.request('words?rel_jjb=beach').then((json) => {
            console.log(json);
            this.populateArray(json);
        });
    }

    populateArray(json) {
        let word;
        for (let i = 0; i < json.length; i++) {
            word = json[i].word;
            words.push(word);
        }
    }

    handleClick(e) {
        e.preventDefault();
        console.log(words);
        let newWord = words.pop();
        this.setState({
            word: newWord
        });
    }

    render() {
        return (
            <div>
                <button type="button" id="new_word" onClick={this.handleClick}>
                    Show me a new Word!
                </button>
                <div>Word is.. {this.state.word}</div>
            </div>
        );
    }
}