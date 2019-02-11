const models = require('../models');
const express = require('express');
const userLogin = express.Router({mergeParams: true});
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// userLogin.post('/', (req, res) => {
//   models.User.findOne({where: {email: req.body.email}})
//     .then(user => {
//       if (!user) {
//         res.status(401).json({message: 'Authentication failed.'});
//       } else {
//         bcrypt.compare(req.body.password, user.encryptedPassword)
//           .then(res.status(200).json({message: 'Authentication successful.'}))
//           .catch(res.status(401).json({message: 'Authentication failed.'}));
//       }
//     })
//     .catch(error => {
//       res.status(500).json(error);
//     });
// });

userLogin.post('/', (req, res) => {
  models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        res.status(401).json({message: 'Authentication failed.'});
      } else {
        bcrypt.compare(req.body.password, user.encryptedPassword, (err, result) => {
          if (err) {
            res.status(401).json({message: 'Authentication failed.'});
          } else if (result) {
            const token = jwt.sign({data: req.body.email}, 'secretpass', {expiresIn: '1h'});
            res.status(200).json({message: 'Authentication successful.', token});
            console.log(token);
          } else {
            res.status(401).json({message: 'Authentication failed.'});
          }
          console.log(result);
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = userLogin;
