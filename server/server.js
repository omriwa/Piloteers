const express = require('express');
const server = express();
const bodyParser = require('body-parser');

// CONFIGURATION
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// ROUTES
server.get('/', (req, res) => {
    res.send('work');
});

server.post('/', (req, res) => {
    res.send('post');
});

// LISTENING 
server.listen(8080, e => {
    if (e) {
        console.log('error in listen', e);
    }
    else {
        console.log('server is listening on 8080');
    }
});