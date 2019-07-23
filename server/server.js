const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const fileHelper = require('./helpers/fileHelper');
const path = require('path');

// CONFIGURATION
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// ROUTES
server.get('/', (req, res) => {
    const dirPath = path.join(__dirname,'uploadedJson');

    fileHelper.getFilesContextFromDir(dirPath, res);
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