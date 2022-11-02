const fs = require('fs');
const readline = require('readline');
const { stdin: input, stdout } = require('process');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(pathFile);
const rl = readline.createInterface({ input, output });


stdout.write('Приветствую! Введите текст: \n'); //обычный вывод console

rl.on('line', (input) => {
    if(input === 'exit') {
        console.log('До новых встреч!');
        process.exit()
    }
    output.write(input + '\n')
  });


process.on('SIGINT', () => {
    console.log('До новых встреч!');
    process.exit()
  });

