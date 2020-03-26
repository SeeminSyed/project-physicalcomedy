import React from 'react'
const datamuse = require('datamuse');

const button = {
    background: '#ffffff',
    // display: 'flex',
    border: '2px #0e2b4d solid',
    alignSelf: 'center',
    fontSize: '90%',
    borderRadius: '10px',
    textAlign: 'center',
    color: '#1d7786',
    fontFamily: `'Poppins', sans-serif`,
    padding: '10px 10px',
}

const wordIs = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '150%',
}

const guessWord = {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '200%',
    color: '#ff0260',
    fontWeight: 'bold',
    fontFamily: `'Raleway', sans-serif`,
}

// stores all the words recieved from the API
// -> reduces API calls
const words = [];

export default class Words extends React.Component {
    constructor() {
        super();
        this.state = { word: '' }; // holds the recently popped word
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
                <div style={wordIs}>
                    Word is.. 
                    <div id="guess-word" style={guessWord}>
                        {this.state.word}
                    </div>
                    <button type="button" id="new_word" style={button} onClick={this.handleClick}>
                        Show me a new Word!
                    </button>
                </div>
            </div>
        );
    }
}