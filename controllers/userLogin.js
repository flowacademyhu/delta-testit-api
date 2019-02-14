const models = require('../models');
const express = require('express');
const userLogin = express.Router({ mergeParams: true });
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const generator = require('generate-password');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  port: 25,
  auth: {
    user: 'email',
    pass: 'password'
  },
  tls: {
    rejectUnauthorized: false
  }
});

userLogin.post('/', (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(401).json({ message: 'Authentication failed.' });
      } else {
        bcrypt.compare(req.body.password, user.encryptedPassword, (err, result) => {
          if (err) {
            res.status(401).json({ message: 'Authentication failed.' });
          } else if (result) {
            const token = jwt.sign({ data: req.body.email }, 'secretpass', { expiresIn: '1h' });
            res.status(200).json({ message: 'Authentication successful.', token });
            console.log(token);
          } else {
            res.status(401).json({ message: 'Authentication failed.' });
          }
          console.log(result);
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

userLogin.put('/reset', (req, res) => {
  models.User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        res.status(400).json({ message: 'Email does not exist!' });
      } else {
        let pwd = generator.generate({
          length: 10,
          numbers: true
        });
        bcrypt.hash(pwd, 10)
          .then(hash => {
            pwd = hash;
            models.User.update({
              encryptedPassword: pwd
            });
          }).then(results => {
            let email = {
              form: 'TestIT group, testit@gmail.com',
              to: req.body.email,
              subject: 'TestIT reset password',
              text: 'Tisztelt regisztált tagunk! Az ön általt igényelet új password: ' + pwd + ' !'
            };

            transporter.sendMail(email, (err, info) => {
              if (err) {
                return console.log(err);
              }
              res.json({ success: true, message: 'New password send to email!' });
            });
          });
      }
    });
});

module.exports = userLogin;
