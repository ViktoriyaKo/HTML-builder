const fs = require("fs");
const path = require("path");

// создание папки
fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Папка "files" успешно скопирована');
});

let readFrom = path.join(__dirname, "files");
let copyTo = path.join(__dirname, "files-copy");

function copyFile(pathFile, pathCopy) {
  fs.readdir(pathFile, { withFileTypes: true }, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (!file.isFile()) {
        copyFile(
          path.join(pathFile, file.name),
          path.join(pathCopy, file.name)
        );
      } else {
        (async () => {
          //create => copy
          try {
            await fs.promises.mkdir(pathCopy, { recursive: true });
            let filePathOld = path.join(pathFile, file.name);
            let filePathNew = path.join(pathCopy, file.name);
            await fs.promises.copyFile(filePathOld, filePathNew);
          } catch (error) {
            throw error;
          }
        })();
      }
    });

    // удаление повторений
    fs.promises.readdir(copyTo).then((copyFile) => {
      let arrayFiles = [];
      files.forEach((file) => {
        arrayFiles.push(file.name);
      });
      let extraFile = copyFile.filter((item) => !arrayFiles.includes(item));

      extraFile.forEach((extFile) => {
        fs.promises.rm(path.join(copyTo, extFile));
      });
    });
  });
}

copyFile(readFrom, copyTo);
