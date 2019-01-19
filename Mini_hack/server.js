const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const ScoreModel = require("./model/scoreModules");
const port = 8080;
// end of import library 
ScoreModel.find({});
mongoose.connect("mongodb://localhost:27017/scorekeeper", { useNewUrlParser: true }, (err) => {
    if(err) console.log("DB connect fail!", err)
	else console.log("DB connect success!");
});
app.use("/about", express.static("resource"));
app.use("/public", express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
//post method for score keeper 1 
app.post('/scoreKeeper',(req, res) => {
    ScoreModel.create(
        {
            player: [
                { name: req.body.player_Obj1, score: 0 },
                { name: req.body.player_Obj2, score: 0 },
                { name: req.body.player_Obj3, score: 0 },
                { name: req.body.player_Obj4, score: 0 }
            ]
        },
        (err, scoreCreated) => {
            var id = scoreCreated._id;
            console.log(id);
            if(err) console.log(err);
            else res.redirect("/games/" + id);
        }   
    )
})

// create api for storing score 
app.get("/api/games/:scoreId", (req, res) => {
	const scoreId = req.params.scoreId;
	ScoreModel.findOne({ _id: scoreId }, function(err, scoreFound) {
		if(err) console.log(err)
		else if(!scoreFound || !scoreFound._id) res.status(404).send({ message: "Question not exist!" })
		else res.send({ score: scoreFound });
	});
});

// app.post('/api/games/:scoreId', (req, res) => {
//     const gameId = req.params.scoreId;

// })

app.get("/games/:scoreId", (req, res) => {
	res.sendFile(__dirname + "/view/2.html");
});

app.post('/asd/:scoreId', (req, res) => {
    var id = req.params.scoreId
    var newScore = JSON.parse(req.body.arr);
    var round_y = req.body.round;
    var position_x = req.body.position;
    console.log(newScore);
    var query = "player." + position_x + ".score." + round_y;
    
    ScoreModel.findOneAndUpdate(
        { _id: id }, 
        { $set: { [query]: newScore[0] }},
        { multi: false },
        (err, found) => {
            if(err) console.log(err);
            else res.end();
        }
    )
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/view/scoreKeeper1.html");
});


app.listen(port, (err) => {
    if(err) console.log(err);
    else console.log("Listening at port "+ port );
});