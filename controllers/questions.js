const express = require('express');
const questions = express();
const models = require('../models');

// index
questions.get('/', (req, res) => {
  models.Question.findAll().then(questions => {
    res.status(200).json(questions);
  }).catch(err => {
    res.status(400).json('' + err);
  });
});

// show by ID
questions.get('/:id', (req, res) => {
  models.Question.findById(req.params.id)
    .then(question => {
      if (!question) {
        throw new Error();
      }
      res.json(question);
    }).catch(err => {
      res.status(400).json('' + err);
    });
});

// create
questions.post('/', (req, res) => {
  models.Question.create({
    questionText: req.body.questionText
  }).then(question => {
    res.status(200).json(question);
  }).catch(err => {
    res.status(400).json('' + err);
  });
});

// update
questions.put('/:id', (req, res) => {
  models.Question.findOne({ where: { id: req.params.id } })
    .then(result => {
      if (!result) {
        throw new Error();
      }
      const params = {
        questionText: req.body.questionText
      };
      models.Question.update(params, { where: { id: req.params.id } })
        .then(updated => {
          res.status(200).json(updated);
        }).catch(err => {
          res.status(400).json('' + err);
        });
    })
    .catch(err => {
      res.status(400).json('' + err);
    });
});

// delete
questions.delete('/:id', (req, res) => {
  models.Question.destroy({
    where: {
      id: req.params.id
    }
  }).then(question => {
    if (!question) {
      throw new Error();
    }
    res.json(question);
  }).catch(err => {
    res.status(400).json('' + err);
  });
});

module.exports = questions;
