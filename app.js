// project/server/peer-server.js

const express = require('express');
const { ExpressPeerServer } = require('peer');
const fs = require('fs');
const path = require('path');
const app = express();
const datamuse = require('datamuse');

// serve React files
app.use(express.static(path.join(__dirname, 'static/build')));

function getCode(type) {
    let code = '';
    switch (type) {
        case 'Adjectives':
            code = 'rel_jjb';
            break;
        case 'Synonyms':
            code = 'rel_syn';
            break;
        case 'Antonyms':
            code = 'rel_ant';
            break;
        case 'Rhymes':
            code = 'rel_rhy';
            break;
        case 'Homophones':
            code = 'rel_hom';
            break;
        default: // Nouns
            code = 'rel_jja';
            break;
    }
    return code;
}

function populateArray(json) {
    let words = [];
    let word;
    for (let i = 0; i < json.length; i++) {
        word = json[i].word;
        words.push(word);
    }
    return words;
}

app.get('/words/:type/:word', function (req, res, next) {
    let code = getCode(req.params.type);
    datamuse.request(`words?${code}=${req.params.word}`).then((json) => {
        let words = populateArray(json);
        res.json(words);
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/static/build/index.html'));
});

const http = require('http');
const PORT = (process.env.PORT || 5000);

const server = http.createServer(app);
const peerServer = ExpressPeerServer(server, {
    debug: true,
    path: '/myapp',
});

app.use('/peerjs', peerServer);
server.listen(PORT, function (err) {
    if (err) console.log(err);
    else console.log("HTTP server on http://localhost:%s", PORT);
});