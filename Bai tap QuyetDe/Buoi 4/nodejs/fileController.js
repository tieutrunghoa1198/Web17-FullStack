const fs = require('fs');

function readFile(filePath, callBack){
    fs.readFile(
        filePath,
        {encoding: 'utf-8'},
        (err, data) => {
            if(err) console.log(err);
            else {
                callBack(data);
            }
        }
    );
}

function writeFile(filePath, fileData){
    const writeFile = fs.writeFileSync(
        filePath,
        fileData,
        {encoding: 'utf-8'},
        (err) => {
            if(err) console.log(err);
            else console.log('writeFile success');
        }
    );
}

module.exports = {
    readFile,
    writeFile
}