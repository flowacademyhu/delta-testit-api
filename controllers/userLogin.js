const models = require('../models');
const express = require('express');
const userLogin = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');

userLogin.post('/', (req, res) => {
  models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        return res.status(401).json({message: 'Authentication failed.'});
      } else {
        bcrypt.compare(req.body.password, user.encryptedPassword)
          .then(res.status(200).json({message: 'Authentication successful.'}))
          .catch(res.status(401).json({message: 'Authentication fialed.'}));
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = userLogin;
