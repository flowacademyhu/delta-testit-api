const models = require('../models');
const userResults = require('express').Router({mergeParams: true});
const express = require('express');

userResults.get('/', (req, res) => {
  models.Result.findAll({where: { userId: req.params.userId }}).then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(400).json(error);
  });
});

module.exports = userResults;
