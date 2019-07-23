const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRoute');

// CONFIGURATION
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

// ROUTES
server.use('/api', apiRouter);

// LISTENING 
server.listen(8080, e => {
    if (e) {
        console.log('error in listen', e);
    }
    else {
        console.log('server is listening on 8080');
    }
});