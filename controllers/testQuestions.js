const express = require('express');
const models = require('../models');
const testQuestions = express.Router({mergeParams: true});

// index
testQuestions.get('/', (req, res) => {
  models.TestQuestion.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
testQuestions.get('/:id', (req, res) => {
  models.TestQuestion.findById(req.params.id)
    .then(testQuestion => {
      if (testQuestion) {
        res.status(200).json(testQuestion);
      } else {
        res.status(404).json({message: 'Testquestion with given id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// create
testQuestions.post('/', (req, res) => {
  models.TestQuestion.create({
    questionId: req.body.questionId,
    testId: req.body.testId
  }).then(testQuestion => {
    res.status(200).json(testQuestion);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// update
testQuestions.put('/:id', (req, res) => {
  models.TestQuestion.update(
    {
      questionId: req.body.questionId,
      testId: req.body.testId
    },
    {where: {id: req.params.id}})
    .then(testQuestion => {
      res.status(200).json(testQuestion);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
testQuestions.delete('/:id', (req, res) => {
  models.TestQuestion.findById(req.params.id)
    .then(testQuestion => {
      if (testQuestion) {
        let id = testQuestion.id;
        models.TestQuestion.destroy({where: {id: req.params.id}})
          .then(res.send('Testquestion with id ' + id + ' has been successfully deleted.'));
      } else {
        res.status(404).json({message: 'Testquestion with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json({message: error});
    });
});

module.exports = testQuestions;
