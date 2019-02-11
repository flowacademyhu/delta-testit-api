const models = require('../models');
const express = require('express');
const userResults = express.Router({mergeParams: true});

userResults.get('/', (req, res) => {
  models.Result.findAll({where: { userId: req.params.userId }}).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = userResults;
