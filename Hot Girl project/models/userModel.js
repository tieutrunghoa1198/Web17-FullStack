const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    userName: { type: String, unique: true, required: true},
    password: { type: String, required: true },
    avatar: { type: String, required: true }
});

module.exports = mongoose.model('user', UserSchema);