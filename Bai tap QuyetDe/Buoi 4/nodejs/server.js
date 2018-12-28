
const fs = require('fs');
const fileController = require('./fileController.js');
// fileController.writeFile('hello.txt', 'helo 1234');
// console.log(fileController.readFile('hello.txt'));
const {readFile} = fileController;
readFile('hello.txt', (fileData) => {
    console.log('file: ',fileData);
});

// console.log(fileController.writeFile('hello.txt', 'hello 123'));
// console.log(fileController.readFile('hello.txt'));

// const { readFile } = fileController;
// const readFileController = fileController.readFile;

// const obj = {
//     a: 10, 
//     b: 2, 
//     c: 12
// }

// const { a } = obj;
// const variable = obj.a;

//write file with callBack
// console.log('begin');
// fs.writeFile('hello.txt', 'hello brother', (err) => {
//     if(err) console.log(err);
//     else console.log('write file success!!');
// });
// console.log('end');

//readFIle with call back
// console.log('begin');
// fs.readFile('hello.txt', {encoding: 'utf-8'}, (err, data) => {
//     if(err) console.log(err);
//     else console.log('File data: ', data);
// });
// console.log('end');


// const objectData = {
//     name: 'hoa',
//     age: 18
// }
// //convert object to string data using json
// fs.writeFileSync('hello.txt', JSON.stringify(objectData));
// console.log('begin read sync');
// const data = fs.readFileSync('hello.txt', {encoding: 'utf-8'});
// //convert string data to object using json
// const parseData = JSON.parse(data);
// console.log('file: ', parseData.name);
// console.log('file: ', parseData.age);

// console.log('end read sync');

//writeFIle synchronize
// fs.writeFileSync('testSync', 'test sync');

