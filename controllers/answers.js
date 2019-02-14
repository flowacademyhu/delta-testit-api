const express = require('express');
const models = require('../models');
const answers = express.Router({ mergeParams: true });
const choosenAnswer = require('./choosenAnswer');

// index
answers.get('/', (req, res) => {
  models.Answer.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// create
answers.post('/', (req, res) => {
  models.Answer.create({
    questionId: req.body.questionId,
    text: req.body.text,
    isCorrect: req.body.isCorrect,
    picture: req.body.picture
  }).then(answer => {
    res.status(200).json(answer);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// update
answers.put('/:id', (req, res) => {
  models.Answer.update(
    {
      questionId: req.body.questionId,
      text: req.body.text,
      isCorrect: req.body.time,
      picture: req.body.picture
    },
    { where: { id: req.params.id } })
    .then(answer => {
      res.status(200).json(answer);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
answers.delete('/:id', (req, res) => {
  models.Answer.findById(req.params.id)
    .then(models.Choosenanswer.update({ answerId: null }, { where: { answerId: req.params.id } }))
    .then(answer => {
      if (answer) {
        let id = req.params.id;
        models.Answer.destroy({ where: { id: req.params.id } })
          .then(res.json({ message: id + ' has been successfully deleted.' }));
      } else {
        res.status(404).json({ message: 'Answer with given id does not exist.' });
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

module.exports = answers;
