const fs = require('fs');

module.exports.toDateTime = (secs) => {
    var t = new Date(1970, 0, 1); // Epoch
    t.setSeconds(secs);
    return t;
}

module.exports.writeJson = (fileName, data) => {
    const jsonString = JSON.stringify(data);
    fs.writeFile(fileName, jsonString, err => {
        if(err) {
            console.log(err);
        }
    });
}