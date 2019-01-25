const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    username:{type:String,unique:true,required:true},
    password:{type:String,required:true},
    avatar:{type:String,required:true}
})
UserSchema.pre("save",function(next){
    const {password} = this;
    if(this.isModified("password")){
        const salt = bcrypt.genSaltSync(12); // số vòng
        this.password = bcrypt.hashSync(password,salt); // gán pass thành pass mới
    }
    next();
})
module.exports = mongoose.model("user",UserSchema);