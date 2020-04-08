import React from 'react'

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

export default class Words extends React.Component {
    constructor() {
        super();
        this.state = { word: '', words:[] }; // holds the recently popped word
        this.getWords(); // populates words
        this.handleClick = this.handleClick.bind(this);
    }
    
    getWords() {
        //TODO: get words based on user input
        fetch('/words/Noun/tree')
            .then(res => res.json())
            .then(wordsResponse => this.setState({ words: wordsResponse }));
    }

    handleClick(e) {
        e.preventDefault();
        let words = this.state.words;
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