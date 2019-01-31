const express = require('express');
const models = require('../models');
const users = express();

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
  models.User.findById(req.params.id).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// create
users.post('/', (req, res) => {
  models.User.create({
    role: req.body.role,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(user => {
    res.status(200).json(user);
  }).catch(error => {
    res.status(404).json(error);
  });
});

// update
users.put('/:id', (req, res) => {
  models.User.findOne({where: {id: req.params.id}})
    .then(result => {
      const params = {
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        groupId: req.body.groupId
        // encryptedPassword: req.body.encryptedPassword,
        // lastLoginAt: req.body.lastLoginAt
      };
      models.User.update(params, { where: {id: req.params.id} })
        .then(updated => {
          res.status(200).json(updated);
        })
        .catch(error => {
          res.status(404).json(error);
        });
    });
});

// delete
users.delete('/:id', (req, res) => {
  models.User.destroy(
    {where: {id: req.params.id}})
    .then(res.status(200).send('User deleted.'))
    .catch(error => {
      res.send(404).json(error);
    });
});

module.exports = users;
