const express = require('express');
const UserApi = express.Router();
const UserModel = require("../models/userModel");

UserApi.use((req,res,next)=>{
    next();
});
// read all user
UserApi.get('/',(req,res)=>{
    const {page=1,per_page=5} = req.query;
    UserModel.find({})
    .select({
        password:0,
        __v:0
    })
    .skip((page-1)*per_page)
    .limit(Number(per_page))
    .then((users)=>{
        res.send({data:users});  
    })
    .catch((error)=>{
        res.send({error});
    })
});
// c
UserApi.get('/:userId',(req,res)=>{
    const {userId} = req.params;
    UserModel.init()
    .then((userFound)=>{
        return UserModel.create(newUser);
    })
    .catch((error)=>{
        res.send({error});
    })
});
// create
UserApi.post("/",(req,res)=>{
    const {username,password,avatar} = req.body;
    const newUser = {
        username,
        password,
        avatar
    };
    UserModel.create(newUser)
    .then((userCreated)=>{
        res.send({data:userCreated});
    })
    .catch((error)=>{
        res.send({error});
    })
});
// update
UserApi.put("/:userId",(req,res)=>{
    const {userId} = req.params;
    const {password,avatar} = req.body;
    
    UserModel.findById(userId)
    .then((userFound)=>{
        if(!userFound) res.send({error: "User not exist"})
        else{
            if(password) userFound.password = password;
            if(avatar) userFound.avatar = avatar;
            return userFound.save();
        }
    })
    .then((userUpdated)=>{
        res.send({data:userUpdated});
    })
    .catch((error)=>{
        res.send({error});
    })
});
UserApi.delete("/:userId",(req,res)=>{
    const {userId} = req.params;
    UserModel.findByIdAndRemove(userId)
    .then(()=>{
        res.send({data:"Success"});
    })
    .catch((error)=>{
        res.send({error});
    })
})
module.exports = UserApi;