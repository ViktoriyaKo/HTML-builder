const fs = require("fs");
const path = require("path");

const outputCss = fs.createWriteStream(
  path.join(__dirname, "project-dist", "style.css"),
  "utf-8"
);

// создание папки Assets!!!

fs.mkdir(path.join(__dirname, "project-dist"), { recursive: true }, (err) => {
  if (err) throw err;
});

let readFrom = path.join(__dirname, "assets");
let copyTo = path.join(__dirname, "project-dist", "assets");

function copyFile(pathFile, pathCopy) {
  fs.readdir(pathFile, { withFileTypes: true }, (err, files) => {
    //read assets
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
            fs.promises.copyFile(filePathOld, filePathNew);
          } catch (error) {
            throw error;
          }
        })();
      }
    });
  });
}

copyFile(readFrom, copyTo);

// создание style.css!!! //создание по порядку, м вызвать ошибку
const pathFileCss = path.join(__dirname, "styles");

fs.readdir(pathFileCss, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  let data = "";

  files.forEach((file) => {
    if (file.isFile() && file.name.split(".")[1] === "css") {
      let filePath = path.join(__dirname, "styles", file.name);
      let stream = fs.createReadStream(filePath, "utf-8");
      stream.on("error", (error) => console.log(error.message));
      stream.on("data", (data) => outputCss.write(data));
    }
  });
});

// сборка html

const outputHtml = fs.createWriteStream(
  path.join(__dirname, "project-dist", "index.html"),
  "utf-8"
);
const inputHtml = fs.createReadStream(
  path.join(__dirname, "template.html"),
  "utf-8"
);

//считывание components

const pathFileHtml = path.join(__dirname, "components");
let objComp = {};

(async () => {
  try {
    const files = await fs.promises.readdir(pathFileHtml, {
      withFileTypes: true,
    });
    for (const file of files) {
      if (file.isFile() && file.name.split(".")[1] === "html") {
        let filePath = path.join(__dirname, "components", file.name);
        let data = await fs.promises.readFile(filePath, "utf-8");
        objComp[file.name.split(".")[0]] = data;
      }
    }
  } catch (err) {
    console.error(err);
  }
  getObj();
})();

// теги в template изменяются на знаечение ключей components
async function getObj() {
  let a = await fs.promises.readFile(
    path.join(__dirname, "template.html"),
    "utf-8"
  );
  for (key in objComp) {
    a = a.replace(`{{${key}}}`, objComp[key]);
  }
  fs.promises.writeFile(
    path.join(__dirname, "project-dist", "index.html"),
    a,
    "utf-8"
  );
}
