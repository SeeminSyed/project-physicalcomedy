# Physical Comedy REST API Documentation

## [Words API](https://www.datamuse.com/api/)
### Read
* description: retrieves a list of words for the user
* request: GET `/words/:category/:word`
    * `category` - One of Nouns, Adjectives, Synonyms, Antonyms, Rhymes and Homophones
    * `word` - user input.
    
    Players are asked to act or doodle words related to the word and category that they entered.
    Example: If user entered 'tree' as a word and chose 'Nouns' as category, a possible word that a player can get is 'trunk'.
* response: 200
    * content-type: `application/json`
    * body: object
        * a list of words
* example:
`curl -X GET http://localhost:3000/words/Nouns/Tree/`

## [PeerJS](https://peerjs.com/docs.html#start)
### Read
* description: retrieves a unique peer id of a user
* request: GET `ss://0.peerjs.com/peerjs?key=[key]&id=[id]&token=[token]`
* response: 200
    * content-type: `application/json`
    * body: object
        * peerid: an id that the user can use to connect to another user
* example:
`curl -X GET ss://0.peerjs.com/peerjs?key=peerjs&id=swfut9d14m000000&token=v9jqkemx52r`

