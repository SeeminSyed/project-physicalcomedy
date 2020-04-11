# Physical Comedy REST API Documentation

## Words API
### Read
* description: retrieves a list of words for the user
* request: GET `/words/:category/:word`
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