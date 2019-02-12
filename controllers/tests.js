const express = require('express');
const models = require('../models');
const tests = express.Router({mergeParams: true});

// index
tests.get('/', (req, res) => {
  models.Test.findAll({
    include: [{
      model: models.User
    }]
  }).then(result => {
    res.status(200).json(result);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// show
tests.get('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(test => {
      if (test) {
        res.status(200).json(test);
      } else {
        res.status(404).json({message: 'Test with given id does not exist.'});
      }
    }).catch(error => {
      res.status(500).json(error);
    });
});

tests.post('/', (req, res) => {
  console.log('Test creating...');

  models.Test.create({
    userId: req.body.userId,
    name: req.body.name,
    time: req.body.time
  }).then(test => {
    console.log('>> Test created!');
    for (let i = 0; i < req.body.questionId.length; i++) {
      let object = {testId: test.id, questionId: req.body.questionId[i]};
      models.TestQuestion.findOne({where: {questionId: req.body.questionId[i]}})
        .then(testQuestion => {
          console.log('>> >> TestQuestion found!');
          console.log(testQuestion);
          if (testQuestion && !testQuestion.testId) {
            console.log('updated');
            models.TestQuestion.update({
              testId: test.id,
              questionId: req.body.questionId[i]
            }, {
              where: {questionId: req.body.questionId[i]}
            })
              .then(testQuestion => {
                console.log('>> >> >> TestQuestion updated!');
                return res.status(200).json(test);
              })
              .catch(error => res.json(error));
            return res.status(200).json(test);
          } else {
            models.TestQuestion.create(object).then(testQuestion => {
              console.log('>> >> TestQuestion created!');
              return res.status(200).json(test);
            });
          }
        })
        .catch(error => {
          console.error('TestQuestion NOT found with: ' + req.body.questionId[i]);
          res.status(404).json(error);
        });
    }
    console.log('>> >> >> BulkCreate ended!');
  }).catch(error => {
    res.status(404).json(error);
  });

  console.log('Test creating finished!');
});

// update
tests.put('/:id', (req, res) => {
  models.Test.update(
    {
      name: req.body.name,
      time: req.body.time
    },
    {where: {id: req.params.id}})
    .then(test => {
      res.status(200).json(test);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// delete
tests.delete('/:id', (req, res) => {
  models.Test.findById(req.params.id)
    .then(test => {
      if (test) {
        let id = test.id;
        models.TestQuestion.destroy({where: {testId: test.id}});
        models.Test.destroy({where: {id: req.params.id}})
          .then(res.send('Test with id ' + id + ' has been successfully deleted.'));
      } else {
        res.status(404).json({message: 'Test with given id does not exist.'});
      }
    })
    .catch(error => {
      res.status(500).json({message: error});
    });
});

module.exports = tests;
