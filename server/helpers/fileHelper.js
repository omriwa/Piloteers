const path = require('path');
const fs = require('fs');

const getFilesContextFromDir = (dirPath, res) => {
    fs.readdir(dirPath, (e, files) => {
        if (e) {
            console.log("error in fetching files from directory", e);
            res.status(404)
            res.send([]);
        }
        else {
            const output = [];

            res.status(200);
            files.forEach(file => {
                const filePath = path.join(dirPath, file);
                try {
                    const data = fs.readFileSync(filePath, 'utf8');

                    output.push(JSON.parse(data));
                }
                catch (e) {
                    console.log('error in reading file content', e);
                }
            });

            res.send(output);
        }
    });
}

const writeJsonDataIntoJsonFile = (dirPath, data, res) => {
    fs.writeFile(dirPath + '\\' + data.name + '.json', JSON.stringify(data), 'utf8', (e, callbackData) => {
        if (e) {
            console.log('error in writing json file');
            res.status(500);
        }
        else {
            res.status(200);
        }
    });
}

module.exports = { getFilesContextFromDir, writeJsonDataIntoJsonFile}