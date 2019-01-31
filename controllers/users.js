const express = require('express');
const models = require('../models');
const users = express();

// index
users.get('/', (req, res) => {
  models.User.findAll().then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json('' + error);
  });
});

// show
users.get('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .then(result => {
      if (!result) {
        throw new Error();
      }
      res.status(200).json(result);
    }).catch(error => {
      res.status(404).json({message: error + '! User with given id does not exist.'});
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
  models.User.update(
    {
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    {where: {id: req.params.id}})
    .then(updated => {
      res.status(200).json(updated);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

/*
// update
users.put('/:id', (req, res) => {
  let firstName = req.body.firstName;
  models.User.update(
    {
      role: req.body.role,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    },
    {where: {id: req.params.id}})
    .then(updated => {
      res.status(200).json(firstName + ' has been successfully updated.');
    })
    .catch(error => {
      res.status(404).json({message: error + '! User with given id does not exist!'
      });
    });
});
*/

/*
// update
users.put('/:id', (req, res) => {
  models.User.findOne({ where: {id: req.params.id} })
    .then(result => {
      if (!result) {
        throw new Error();
      }
      const params = {
        role: req.body.role,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      };
      models.User.update(params, { where: {id: req.params.id} })
        .then(updated => {
          res.status(200).json(updated);
        })
        .catch(error => {
          res.status(404).json({message: error + '! Please fill in all fields!'});
        });
    })
    .catch(error => {
      res.status(404).json({message: error + '! User with given id does not exist!'});
    });
});
*/

// delete
users.delete('/:id', (req, res) => {
  models.User.findById(req.params.id)
    .then(result => {
      if (!result) {
        throw new Error();
      }
      let name = result.firstName;
      models.User.destroy({where: {id: req.params.id}})
        .then(res.send(name + ' has been successfully deleted.'));
    })
    .catch(error => {
      res.status(404).json({message: error + '! User with given id does not exist.'});
    });
});

module.exports = users;
