const express = require('express');
const models = require('../models');
const groups = express.Router({mergeParams: true});

// index
groups.get('/', (req, res) => {
  models.Group.findAll()
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
groups.delete('/:id', (req, res) => {
  models.Group.findById(req.params.id)
    .then(group => {
      if (group) {
        let id = group.id;
        models.Group.destroy({where: {id: req.params.id}})
          .then(res.json({message: id + ' has been successfully deleted.'}));
      } else {
        res.status(404).json({message: 'Group with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});
