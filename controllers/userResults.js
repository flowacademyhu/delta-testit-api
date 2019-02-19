const express = require('express');
const models = require('../models');
const userResults = express.Router({ mergeParams: true });

// index
userResults.get('/', (req, res) => {
  models.Result.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Test
    }]
  }).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
userResults.get('/:userId', (req, res) => {
  models.Result.findAll({where: {userId: req.params.userId}}).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// choosenanswers[], userId, resultId, status
userResults.post('/fill', async (req, res) => {
  let promises = [];
  models.Result.create({testId: req.body.testId, userId: req.params.userId, status: req.body.status})
    .then(async result => {
      try {
        req.body.choosenAnswers.forEach(async choosenAnswer => {
          promises.push(
            models.ChoosenAnswer.create({
              resultId: result.id,
              answerId: choosenAnswer.id,
              points: choosenAnswer.points
            }));
        });
      } catch (error) {
        res.status(400).send(error);
      }

      let resp = await Promise.all(promises);
      res.status(200).json(resp);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = userResults;
