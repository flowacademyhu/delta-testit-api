const express = require('express');
const models = require('../models');
const choosenAnswer = express.Router({ mergeParams: true });

// update
choosenAnswer.put('/:id', (req, res) => {
  models.ChoosenAnswer.update(
    {
      resultId: req.body.resultId,
      answerId: req.body.answerId || null,
      points: req.body.points
    },
    { where: { id: req.params.id } })
    .then(question => {
      res.status(200).json(question);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

module.exports = choosenAnswer;
