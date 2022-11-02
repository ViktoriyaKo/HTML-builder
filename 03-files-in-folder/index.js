const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'secret-folder');


fs.readdir(pathFile, {withFileTypes: true}, (err, files) => {
    if (err) throw err;

    files.forEach(file => {
        let filePath = path.join(__dirname, 'secret-folder', file.name);

        if(file.isFile()) {
            fs.stat(filePath, (err, stats) => {
                if (err) throw err;
                console.log(`${file.name.split('.')[0]} - ${file.name.split('.')[1]} - ${stats.size} bytes`)
                
            })
        }})
    });


