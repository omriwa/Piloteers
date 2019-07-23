const express = require('express')
const apiRouter = express.Router();
const fileHelper = require('../helpers/fileHelper');
const path = require('path');

apiRouter.get('/', (req, res) => {
    const dirPath = path.resolve('./uploadedJson');

    fileHelper.getFilesContextFromDir(dirPath, res);
});

apiRouter.post('/', (req, res) => {
    res.send('post');
});

module.exports = apiRouter;