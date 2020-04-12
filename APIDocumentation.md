# Physical Comedy REST API Documentation

## Words API
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

## Peer Id
### Read
* description: retrieves a unique peer id of a user
* request: GET `/dk`
* response: 200
    * content-type: `application/json`
    * body: object
        * peerid: an id that the user can use to connect to another user