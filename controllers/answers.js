const express = require('express');
const models = require('../models');
const answers = express.Router({mergeParams: true});

answers.post('/', (req, res) => {
  models.Answer.create({
    questionId: req.body.questionId,
    text: req.body.text,
    isCorrect: req.body.isCorrect,
    picture: req.body.picture
  }).then(user => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(404).json(error);
  });
});

module.exports = answers;
