const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
//request GET => httt://localhost:6969/

app.use(express.static('../quyetde/CV'));

app.get('/', (req, resp) => {
    // resp.send('chao ba con');
    resp.send(JSON.stringify({a: 4,b: 2}) + Math.random() );
});

app.get('/about', (req, resp) => {
    //show ra trang CV 
    resp.sendFile(path.resolve(__dirname, './CV/project.html'));
});



app.listen(8080);
console.log('Running at port 8080');
