const express = require('express');
const models = require('../models');
const bcrypt = require('bcrypt');
const users = express.Router({mergeParams: true});

// index
users.get('/', (req, res) => {
  models.User.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
users.get('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({message: 'User with given id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

// create
users.post('/', (req, res) => {
  models.User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (user >= 1) {
        res.status(409).json('User with such an email already exits!');
      } else {
        bcrypt.hash(req.body.encryptedPassword, 10)
          .then(hash => {
            req.body.encryptedPassword = hash;
            models.User.create({
              role: req.body.role,
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              encryptedPassword: req.body.encryptedPassword
            }).then(user => {
              res.status(201).json({message: 'User has been succesfully created.'});
            }).catch(error => {
              res.status(500).json(error);
            });
          })
          .catch(error => {
            res.status(500).json(error);
          });
      }
    });
});

// update
users.put('/:id', (req, res) => {
  models.User.update(
    {
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    {where: {id: req.params.id}})
    .then(user => {
      let name = req.body.firstName;
      res.status(200).json({message: name + ' has been succesfully updated.'});
    })
    .catch(error => {
      res.status(406).json(error);
    });
});

// delete
users.delete('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .then(user => {
      if (user) {
        let name = user.firstName;
        models.User.destroy({where: {id: req.params.id}})
          .then(res.json({message: name + ' has been successfully deleted.'}));
      } else {
        res.status(404).json({message: 'User with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = users;
