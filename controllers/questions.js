const express = require('express');
const questions = express();
const models = require('../models');

// index
questions.get('/', (req, res) => {
  models.Question.findAll().then(questions => {
    res.json(questions);
  });
});

// show by ID
questions.get('/:id', (req, res) => {
  models.Question.findById(req.params.id).then(question => {
    if (!question) {
      return res.status(400);
    }
    res.json(question);
  });
});

// create
questions.post('/', (req, res) => {
  models.Question.findOne({
    where: {
      id: req.body.id
    }
  }).then(result => {
    if (result) {
      return res.status(400).send('This question already exist!');
    } else {
      models.Question.create(req.body).then(flat => {
        res.json(flat);
      });
    }
  });
});

// update
questions.put('/:id', (req, res) => {
  models.Question.findById(req.params.id).then(result => {
    models.Question.findOne({
      where: {
        model: req.params.model
      }
    }).then(result => {
      if (!result) {
        return res.status(400).send('You can not modifying, because it is already exist!');
      } else {
        models.Question.update(req.body, {
          where: {
            id: req.params.id
          }
        }).then(result => {
          res.json(result);
        });
      }
    });
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
      return res.status(400).send('This question is not exist!');
    }
    res.json(question);
  });
});

module.exports = questions;
