const express = require('express');
const models = require('../models');
const testQuestion = express.Router({mergeParams: true});

// index
testQuestion.get('/', (req, res) => {
  models.TestQuestion.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show 1
testQuestion.get('/answerid/:id', (req, res) => {
  models.TestQuestion.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({message: 'Testquestion with given answer-id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// show 2
testQuestion.get('/testid/:id', (req, res) => {
  models.TestQuestion.findById(req.params.id)
    .then(result => {
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({message: 'Testquestion with given test-id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// create
testQuestion.post('/', (req, res) => {
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
testQuestion.put('/:id', (req, res) => {
  models.TestQuestion.update(
    {
      questionId: req.body.questionId,
      testId: req.body.testId
    },
    {where: {id: req.params.id}})
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
testQuestion.delete('/:id', (req, res) => {
  models.TestQuestion.findById(req.params.id)
    .then(result => {
      if (result) {
        let id = result.id;
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

// delete 2

testQuestion.delete('/', (req, res) => {
  models.TestQuestion.findOne({where: {questionId: req.body.questionId} || {testId: req.body.testId}})
    .then(result => {
      if (result) {
        models.TestQuestion.destroy(result)
          .then(res.send('Testquestion with id has been successfully deleted.'));
      } else {
        res.status(404).json({message: 'Testquestion with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json({message: error});
    });
});

module.exports = testQuestion;
