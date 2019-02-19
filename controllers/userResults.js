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
userResults.get('/:id', (req, res) => {
  models.Result.findByPk(req.params.id).then(result => {
    res.status(200).res.json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

userResults.post('/:id/fill', (req, res) => {
  models.Result.findByPk(req.params.id)
    .then(async result => {
      result.update({status: 'CLOSED'});
      const choosenAnswers = [];
      req.body.answerIds.forEach(async answerId => {
        const answer = await models.Answer.findByPk(answerId);
        const question = await answer.getQuestion();
        const points = answer.isCorrect ? question.value : 0;
        const choosenAnswer = await models.ChoosenAnswer.create({
          resultId: result.id,
          answerId: answerId,
          points
        });
        choosenAnswers.push(choosenAnswer);
      });
      res.json({choosenAnswers});
    });
});

module.exports = userResults;