//считывание и вывод потока
const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathFile, 'utf-8');

let data = '';
stream.on('error', error => console.log('Error', error.message)); // обработка ошибки
stream.on('data', chunk => data += chunk); // считываем чанки, data - событие data, которое генерируется, когда стрим прочитал порцию данных и готов отдать ее потребителю
stream.on('end', () => console.log(data)); //end-событие срабатывает, когда все данные уже переданы.


