const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ScoreSchema = new Schema({
    player: [
        { name: String, score: [] },
        { name: String, score: [] },
        { name: String, score: [] },
        { name: String, score: [] }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('Score', ScoreSchema);