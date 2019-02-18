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
testResults.post('/user/:userId/results/:id/fill', async (req, res) => {
  let promises = [];
  models.Result.create({testId: req.params.testId, userId: req.params.userId, status: req.body.status})
    .then(result => {
      req.body.choosenAnswers.forEach(async choosenAnswer => {
        promises.push(
          models.choosenAnswer.create({
            resultId: result.id,
            answerId: choosenAnswer.id,
            points: choosenAnswer.points
          }));
      });
    })
    .catch(error => {
      res.status(500).res.json(error);
    });
  let resp = await Promise.all(promises);
  res.json({resp});
});

module.exports = testResults;
