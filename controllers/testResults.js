const models = require('../models');
const express = require('express');
const testResults = express.Router({mergeParams: true});

testResults.get('/', (req, res) => {
  models.Result.findAll({where: { testId: req.params.testId }}).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = testResults;
