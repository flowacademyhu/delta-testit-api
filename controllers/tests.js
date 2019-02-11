const express = require('express');
const models = require('../models');
const tests = express.Router({mergeParams: true});

// index
tests.get('/', (req, res) => {
  models.Test.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
tests.get('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(test => {
      if (test) {
        res.status(200).json(test);
      } else {
        res.status(404).json({message: 'Test with given id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// create
tests.post('/', (req, res) => {
  models.Test.create({
    userId: req.body.userId,
    name: req.body.name,
    time: req.body.time
  }).then(test => {
    models.TestQuestion.findOne({where: {questionId: test.questionId}})
      .then(testQuestion => {
        if (testQuestion && testQuestion.testId.length < 1) {
          models.TestQuestion.update({
            testId: test.id
          }, {
            where: {questionId: testQuestion.questionId}
          });
        } else {
          models.TestQuestion.create({
            questionId: req.body.questionId,
            testId: test.id
          });
        }
      })
      .catch(error => {
        res.status().json(error);
      });
    res.status(200).json(test);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// update
tests.put('/:id', (req, res) => {
  models.Test.update(
    {
      name: req.body.name,
      time: req.body.time
    },
    {where: {id: req.params.id}})
    .then(test => {
      res.status(200).json(test);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
tests.delete('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(test => {
      if (test) {
        let id = test.id;
        models.TestQuestion.destroy({where: {testId: test.id}});
        models.Test.destroy({where: {id: req.params.id}})
          .then(res.send('Test with id ' + id + ' has been successfully deleted.'));
      } else {
        res.status(404).json({message: 'Test with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json({message: error});
    });
});

module.exports = tests;
