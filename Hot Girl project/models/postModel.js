const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
    author: String,
    comment: String,
}, {
    _id: false
})
const PostSchema = new Schema({
    img: { type: String, required: true },
    description: { type: String },
    like: [String],
    title: { type: String, required: true },
    comment: [ CommentSchema ],
    view: { type: Number, default: 0 },
    date: { type: Date, default: new Date() },
    author: String
}, {
    timestamps: true // createAt updateAt
});

module.exports = mongoose.module('post', PostSchema);