const express = require('express');
const models = require('../models');
const tests = express.Router({ mergeParams: true });

// index
tests.get('/', (req, res) => {
  models.Test.findAll({
    include: [{
      model: models.User
    }, {
      model: models.TestQuestion,
      include: [{
        model: models.Question,
        include: [{
          model: models.Subject
        }]
      }]
    }]
  }).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
tests.get('/:id', (req, res) => {
  models.Test.findById(req.params.id, {
    include: [{
      model: models.User
    }, {
      model: models.TestQuestion,
      include: [{
        model: models.Question,
        include: [{
          model: models.Subject
        },
        {
          model: models.Answer
        }]
      }]
    }]
  })
    .then(test => {
      if (test) {
        res.status(200).json(test);
      } else {
        res.status(404).json({ message: 'Test with given id does not exist.' });
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// show test with questions and answers
tests.get('/start/:id', (req, res) => {
  models.Test.findAll({
    where: { id: req.params.id },
    include: [{
      model: models.User
    }, {
      model: models.TestQuestion,
      include: [{
        model: models.Question,
        include: [{
          model: models.Answer
        }]
      }]
    }]
  }).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// create
tests.post('/', async (req, res) => {
  try {
    let test = await models.Test.create(
      {
        userId: req.body.userId,
        name: req.body.name,
        time: req.body.time,
        status: req.body.status,
        archivedTest: req.body.archivedTest
      }
    );
    let promises = [];
    req.body.questions.map(async questionsId => {
      promises.push(models.TestQuestion.create({ testId: test.id, questionId: questionsId }));
    });
    let resp = await Promise.all(promises);
    res.json({ resp });
  } catch (error) {
    res.status(400).json(error);
  }
});

// update
tests.put('/:id', (req, res) => {
  models.Test.update(
    {
      name: req.body.name,
      time: req.body.time,
      status: req.body.status,
      userid: req.body.userId
    },
    { where: { id: req.params.id } })
    .then(test => {
      res.status(200).json(test);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
tests.delete('/:id', (req, res) => {
  let id = req.params.id;
  models.TestQuestion.destroy({ where: { testId: id } });
  models.Test.destroy({ where: { id: id } })
    .then(res.send('Test with id ' + id + ' has been successfully deleted.'))
    .catch(error => {
      res.status(500).json({ message: error });
    });
});

module.exports = tests;
