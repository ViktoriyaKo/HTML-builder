const fs = require("fs");
const path = require("path");
const pathFile = path.join(__dirname, "styles");
const output = fs.createWriteStream(
  path.join(__dirname, "project-dist", "bundle.css"),
  "utf-8"
);

fs.readdir(pathFile, { withFileTypes: true }, (err, files) => {
  if (err) throw err;

  files.forEach((file) => {
    if (file.isFile() && file.name.split(".")[1] === "css") {
      let filePath = path.join(__dirname, "styles", file.name);
      let stream = fs.createReadStream(filePath, "utf-8");
      stream.on("error", (error) => console.log("Error", error.message));
      stream.on("data", (data) => output.write(data));
    }
  });
  console.log("Файл bundle.css создан");
});
