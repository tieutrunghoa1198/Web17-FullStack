const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
//request GET => httt://localhost:6969/

// <----- USE LIBRARIES ----->

//use body-parser           <-- MiddleWare --> 
app.use(bodyParser.urlencoded({extended: false }));
//to allow user access to project folder
app.use('/public', express.static('public'));
// <----- END OF LIBRARIES -----> 

// <----- ACTION ON GET AND POST -----> 

app.get('/', (req, res) => {
    //Lay ra cau hoi random 
    const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    if(questions.length == 0){
        res.send('chưa có câu hỏi nào!!');
    }
    else {
        const randomQuest = questions[Math.floor(Math.random()*questions.length)];
        res.sendFile(__dirname + '/view/answer.html');
    }
    
});

app.get('/api/random', (req, res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    const randomQuest = questions[Math.floor(Math.random()*questions.length)];
    res.send({ quest: randomQuest }); //data = { question: randomQuestion }

})

app.get('/vote/:questionID/:vote', (req, res) => {
    //params
    // console.log(req.params.questionId);
    const questionID = req.params.questionID;
    const vote = req.params.vote;
    const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));    
    questions.forEach((question, index) => {
        if(question.id == questionID) {
            questions[index][vote] += 1;
        }
    });
    fs.writeFileSync('./questions.json', JSON.stringify(questions));
    res.redirect('/');
});

//get /ask via route 8080
app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/view/ask.html');
});
//post in4 to /addquestion 
app.post('/addquestion', (req, res) => {
    const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    const newQuestion = {
        content: req.body.questionContent,
        yes: 0,
        no: 0,
        id: questions.length
    }
    questions.push(newQuestion);
    fs.writeFileSync('./questions.json', JSON.stringify(questions));
    res.redirect('/');
});

app.get("/question/:questionId", (req, res) => {
    const questionId = req.params.questionId;
    const question = JSON.parse(fs.readFileSync("./questions.json", {encoding: "utf-8"}));
    res.send(question[questionId])
});
// <----- END OF ACTION -----> 

// <----- LISTEN AT ROUTE 8080 -----> 
app.listen(8080 , (err) => {
    if(err) console.log(err);
    else console.log('Listening at port 8080');
});