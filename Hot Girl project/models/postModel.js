const mongoose = require('mongoose'); 
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    author:{type: Schema.Types.ObjectId,ref:'user'},
    content:String
},{
    _id:false
});
const PostSchema = new Schema({
    picture:{type:String,required:true},
    description:{type:String,required:true},
    like:[String],
    title:{type:String,required:true},
    comments:[CommentSchema],
    view:{type:Number,default:0},
    author: {type: Schema.Types.ObjectId,ref:'user'}
},{
    timestamps:true // createAt 
});

module.exports = mongoose.model("post",PostSchema);