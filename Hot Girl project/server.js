const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// router
const UserApi = require('./routers/userApi');
const PostApi = require('./routers/postApi');
const AuthApi = require('./routers/authApi');
const app = express();
// connect db 
mongoose.connect('mongodb://localhost:27017/tkhotgirl', {useNewUrlParser: true},(err)=>{
    if(err){
        console.log("Kết nối lỗi");
    }else{
        console.log("Kết nối thành công");
    }
});
// body parrse
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/user',UserApi);
app.use('/api/post',PostApi);
app.use('/api/auth',AuthApi);







app.use("/public", express.static("public"));
// open connect server
app.listen(3000,(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Server start success!");
    }
});