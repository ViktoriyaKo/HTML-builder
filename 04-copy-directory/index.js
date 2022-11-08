let fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "files");

//создание папки
fs.mkdir(path.join(__dirname, "files-copy"), { recursive: true }, (err) => {
  if (err) throw err;
  console.log('Папка "files" успешно скопирована');
});

//чтение папки
fs.readdir(pathFile, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    let filePathOld = path.join(__dirname, "files", file.name);
    let filePathNew = path.join(__dirname, "files-copy", file.name);
    //копирование
    fs.copyFile(filePathOld, filePathNew, (err) => {
      if (err) throw err;
    });
  });
});
