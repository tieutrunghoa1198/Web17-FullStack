const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const port = 9000;
const UserApi = require('./routers/userApi');
// end of import 
app.use('/api/user', UserApi);
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
mongoose.connect('mongodb://localhost/tk-hotgirls',{ useNewUrlParser: true }, (err) => {
    if(err) console.log(err);
    else console.log('DB connect success');
})
// end of use 
app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log('listening at port ' + port);
})