const express = require('express');
const models = require('../models');
const testResults = express.Router({ mergeParams: true });

// show
testResults.get('/', (req, res) => {
  models.Result.findAll({where: {testId: req.params.testId}}).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// choosenanswers[], userId, resultId, status
/*
testResults.post('/user/:userId/results/:id/fill', (req, res) => {
  models.Result.create({userId: req.params.userId, id: req.params.id, status: req.body.status})
    .then(result => {
      req.body.choosenAnswers.forEach(async choosenAnswer => {
        models.choosenAnswer.create({
          resultId: result.id,
          answerId: choosenAnswer.id,
          points: 0
        });
      }),
    
    .catch();
});*/

// create
testResults.post('/', async (req, res) => {
  let questionsBlock = req.body.questions;            // a tesztben található összes kérdés
  let answersBlock = req.body.answers;                // a tesztben a található összes kérdés összes lehetséges válasza sorrendben
  let choosenAnswersBlock = req.body.choosenAnswers;  // a vizsgázó által kiválasztott válaszok

  let testObject = {
    userId: req.body.userId,
    testId: req.body.testId,
    status: req.body.status,
    archivedTest: {
      questions: [],
      pointsAchieved: 0
    }
  };

  for (let i = 0; i < questionsBlock.length; i++) {
    let questionObject = {
      number: i,
      answers: [],
      choosenAnswer: null,
      subjectId: questionsBlock[i].subjectId,
      text: questionsBlock[i].text,
      value: questionsBlock[i].value,
      pointsGiven: 0
    };
    for (let j = i; j <= i + 3; j++) {
      questionObject.answers.push(answersBlock[j]);
    }
    if (choosenAnswersBlock[i].isCorrect) {
      questionObject.pointsGiven = questionsBlock[i].value;
      testObject.archivedTest.pointsAchieved += questionsBlock[i].value;
    }
    testObject.archivedTest.questions.push(questionObject);
    testObject.archivedTest.questions[i].choosenAnswer = choosenAnswersBlock[i];
  }

  let promises = [];
  models.Result.create({
    testObject
  }).then(async result => {
    result.questions.map(async question => {
      promises.push(models.choosenAnswer.create(
        {
          resultId: result.id,
          answerId: question.choosenAnswer.id,
          points: question.pointsGiven
        }
      ));
    });

    let resp = await Promise.all(promises);
    res.json({resp});
  }).catch(error => {
    res.status(404).json(error);
  });
});

module.exports = testResults;
