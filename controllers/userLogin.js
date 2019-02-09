const models = require('../models');
const express = require('express');
const userLogin = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');

userLogin.post('/', (req, res) => {
  models.User.create({
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    encryptedPassword: bcrypt.hash(req.body.encryptedPassword, 10, (error, hash) => {
      if (error) {
        return res.status(500).json(error);
      }
    })
    // picture: req.file.path
  });
});

userLogin.post('/', (req, res, next) => {
  bcrypt.hash(req.body.encryptedPassword, 10, (error, hash) => {
    if (error) {
      res.status(500).json(error);
    } else {
      models.User.create({
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
        // picture: req.file.path
      }).then(result => {
        res.status(201).json({
          message: 'User created'
        });
      }).catch(res.status(500).json(error));
    }
  });
});

module.exports = userLogin;
