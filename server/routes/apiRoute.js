const express = require('express')
const apiRouter = express.Router();
const fileHelper = require('../helpers/fileHelper');
const path = require('path');

apiRouter.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    next();
});

apiRouter.get('/locations', (req, res, next) => {
    const dirPath = path.resolve('./uploadedJson');

    fileHelper.getFilesContextFromDir(dirPath, res);
});

apiRouter.post('/locations', (req, res, next) => {
    const dirPath = path.resolve('./uploadedJson');
    const data = req.body.locationData

    fileHelper.writeJsonDataIntoJsonFile(dirPath, data, res);
});

module.exports = apiRouter;