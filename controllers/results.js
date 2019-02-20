const express = require('express');
const models = require('../models');
const results = express.Router({mergeParams: true});

// index
results.get('/', (req, res) => {
  models.Result.findAll({
    include: [{
      model: models.User
    }, {
      model: models.Test
    }]
  }).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

results.get('/:userId', (req, res) => {
  models.Result.findByPk(req.params.userId)
    .then(result => {
      console.log(result.id);
      result.sum.then(sum => {
        console.log('sum is : ' + sum);
      });
      res.status(200).json(result.sum);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

module.exports = results;
