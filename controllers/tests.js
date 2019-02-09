const express = require('express');
const models = require('../models');
const tests = express.Router({mergeParams: true});

// index
tests.get('/', (req, res) => {
  models.Test.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json('' + error);
  });
});

// show
tests.get('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(result => {
      if (!result) {
        throw new Error();
      }
      res.status(200).json(result);
    }).catch(error => {
      res.status(404).json({message: error + '! Test with given id does not exist.'});
    });
});

// create
tests.post('/', (req, res) => {
  models.Test.create({
    testName: req.body.testName,
    testTime: req.body.testTime
  }).then(user => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// update
tests.put('/:id', (req, res) => {
  models.Test.update(
    {
      testName: req.body.testName,
      testTime: req.body.testTime
    },
    {where: {id: req.params.id}})
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
tests.delete('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(result => {
      if (!result) {
        throw new Error();
      }
      let id = result.id;
      models.Test.destroy({where: {id: req.params.id}})
        .then(res.send('Test with id ' + id + ' has been successfully deleted.'));
    })
    .catch(error => {
      res.status(404).json({message: error + '! Test with given id does not exist.'});
    });
});

module.exports = tests;
