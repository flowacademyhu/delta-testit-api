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

// get full test
tests.get('/start/:id', (req, res) => {
  let test = {
    id: '',
    name: '',
    time: 0,
    questions: []
  };
  models.Test.findById(req.params.id)
    .then(result => {
      test.id = result.id;
      test.name = result.name;
      test.time = result.time;
      models.TestQuestion.find({where: {testId: result.id}})
        .then(result => {
          models.Question.findById(result.questionId)
            .then(results => {
              for (let i = 0; i < results.length; i++) {
                let question = {
                  subjectId: results[i].subjectId,
                  text: results[i].text,
                  value: results[i].value,
                  status: results[i].status,
                  picture: results[i].picture,
                  answers: []
                };
                models.Answer.findById(results[i].id)
                  .then(results => {
                    for (let j = 0; j < results.length; j++) {
                      let answer = {
                        number: j,
                        text: results[j].text,
                        picture: results[j].picture
                      };
                      question.answers.push(answer);
                    }
                    test.questions.push(question);
                  });
              }
              console.log(test);
            });
        });
    })
    .catch(error => {
      res.status(404).json(error);
    });
  res.json(test);
});

tests.post('/', async (req, res) => {
  let creatorId = req.body.creatorId;
  models.User.findById(creatorId)
    .then(user => {
      creatorId = user.id;
    })
    .catch(error => {
      res.status(500).json(error);
    });

  try {
    let test = await models.Test.create(
      {
        userId: req.body.userId,
        name: req.body.name,
        time: req.body.time,
        status: req.body.status,
        archivedTest: req.body.archivedTest
      }
    );
    let promises = [];
    req.body.questions.map(async item => {
      let object = {testId: test.id, questionId: item};
      let testQuestion = await models.TestQuestion.findOne({where: {questionId: item}});
      if (testQuestion && !testQuestion.testId) {
        promises.push(models.TestQuestion.update({testId: test.id}), {where: {questionId: item}});
      } else {
        promises.push(models.TestQuestion.create(object));
      }
    });
    let resp = await Promise.all(promises);
    res.json({resp, creatorId});
  } catch (error) {
    res.status(400).json(error);
  }
});

// update
tests.put('/:id', (req, res) => {
  models.Test.update(
    {
      name: req.body.name,
      time: req.body.time,
      status: req.body.status,
      userid: req.body.userId
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
  let id = req.params.id;
  models.TestQuestion.destroy({where: {testId: id}});
  models.Test.destroy({where: {id: id}})
    .then(res.send('Test with id ' + id + ' has been successfully deleted.'))
    .catch(error => {
      res.status(500).json({message: error});
    });
});

module.exports = tests;
