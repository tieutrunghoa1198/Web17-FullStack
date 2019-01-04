const fs = require('fs');
const express = require('express');
const app = express();
// const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const QuestionModels = require('./models/questionModels');
const url = 'mongodb://localhost:27017/quyetde-17';
//request GET => httt://localhost:6969/

// <----- USE LIBRARIES ----->

//use mongoose library
mongoose.connect(url, { useNewUrlParser: true }, (err) => {
    if(err) console.log('DB connect fail!', err);
    else console.log('DB connected successfully!');
});
//use body-parser           <-- MiddleWare --> 
app.use(bodyParser.urlencoded({extended: false }));
//to allow user access to project folder
app.use('/public', express.static('public'));
// <----- END OF LIBRARIES -----> 

// <----- ACTION ON GET AND POST -----> 

app.get('/', (req, res) => {
    // Lay ra cau hoi random 
    // const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    // if(questions.length == 0){
    //     res.send('chưa có câu hỏi nào!!');
    // }
    // else {
    //     const randomQuest = questions[Math.floor(Math.random()*questions.length)];
    //     res.sendFile(__dirname + '/view/answer.html');    
    // }
    res.sendFile(__dirname + '/view/answer.html');
});

app.get('/api/random', (req, res) => {
    // const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    // const randomQuest = questions[Math.floor(Math.random()*questions.length)];
    // res.send({ quest: randomQuest }); //data = { question: randomQuestion }
    QuestionModels.find({}, (err, questions) => {
        if(err) console.log(err);
        else {
            const randomQuest = questions[Math.floor(Math.random()*questions.length)];
            res.send({ question: randomQuest })
        }
    });
});

app.get('/vote/:questionID/:vote', (req, res) => {
    //params
    // console.log(req.params.questionId);
    const questionID = req.params.questionID;
    const vote = req.params.vote;
    // const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));    
    // questions.forEach((question, index) => {
    //     if(question.id == questionID) {
    //         questions[index][vote] += 1;
    //     }
    // });
    // fs.writeFileSync('./questions.json', JSON.stringify(questions));
    // res.redirect('/');
    QuestionModels.findById(questionID,  function(err, question) {
        if(err) return handleError(err);
        else {
            if(vote == 'yes') question.yes += 1;
            else question.no += 1;
        };
        question.save(function (err, updateQuestion) {
            if (err) return handleError(err);
            res.send(updateQuestion);
        });
    });

});

//get /ask via route 8080
app.get('/ask', (req, res) => {
    res.sendFile(__dirname + '/view/ask.html');
});
//post in4 to /addquestion 
app.post('/addquestion', (req, res) => {
    // const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    // const newQuestion = {
    //     content: req.body.questionContent
    // }
    QuestionModels.create(
        {
            content: req.body.questionContent
        },
        (err, questionCreated) => {
            if(err) console.log(err);
            else res.redirect('/');
        }
    )
});

app.get("/question/:questionId", (req, res) => {
    res.sendFile(__dirname + '/view/question.html');
});

app.get('/api/question/:questionId', (req, res) => {
    const questionId = req.params.questionId;
    // let questionFound;
    // const questions = JSON.parse(fs.readFileSync('./questions.json', {encoding: 'utf-8' }));
    // questions.forEach(question => {
    //     if(question.id == questionId)
    //     questionFound = question;
    // });
    // res.send({ question: questionFound });
    QuestionModels.findById(questionId, function(err, questionFound) {
        if(err) return handleError(err);
        else res.send({ question: questionFound });
    });

});
// <----- END OF ACTION -----> 

// <----- LISTEN AT ROUTE 8080 -----> 
app.listen(8080 , (err) => {
    if(err) console.log(err);
    else console.log('Listening at port 8080');
});