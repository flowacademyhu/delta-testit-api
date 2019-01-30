const express = require('express');
const models = require('../models');
const users = express();

// index
users.get('/', (req, res) => {
  models.User.findAll().then(result => {
    res.json(result);
  });
});

// show
users.get('/:id', (req, res) => {
  models.User.findById({where: { id: req.params.id }}).then(result => {
    if (result) {
      res.json(result);
    } else {
      res.status(404).send('No such user exists in our database.');
    }
  });
});

// create
users.post('/', (req, res) => {
  models.User.findById({where: { id: req.body.id }})
    .then(result => {
      if (result) {
        if (req.body.role &&
          req.body.firstname &&
          req.body.lastname) {
          models.User.create({
            role: req.body.role,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            // encryptedPassword: req.body.encryptedPassword,
            groupId: req.body.groupId
            // lastLoginAt: req.body.lastLoginAt
          });
        } else {
          res.send('Please fill in all fields to create new user.');
        }
      } else {
        res.status(404).send('No such user exists in our database.');
      }
    });
});

// update
users.put('/:id', (req, res) => {
  models.User.findById({where: { id: req.body.id }})
    .then(result => {
      if (result) {
        models.User.update({
          role: req.body.role,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          // encryptedPassword: req.body.encryptedPassword,
          groupId: req.body.groupId
          // lastLoginAt: req.body.lastLoginAt
        }).then(res.send('User has successfully been updated.'));
      } else {
        res.status(404).send('No such user exists in our database.');
      }
    });
});

// delete
users.delete('/:id', (req, res) => {
  models.User.destroy(
    {where: {id: req.body.id}});
});

module.exports(users);
