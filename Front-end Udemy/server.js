const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/'));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.listen(8080, (err) => {
    if(err) console.log(err);
    else console.log('Listening at port 8080.');
})