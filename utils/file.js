const fs = require('fs');

const deleteFile = (filePath) => {
    fs.unlink(filepath, err => {
        if (err) {
            throw (err);
        }
    })
}

exports.deleteFile = deleteFile;