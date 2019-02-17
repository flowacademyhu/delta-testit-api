const express = require('express');
const models = require('../models');
const results = express.Router({ mergeParams: true });

// index
results.get('/', (req, res) => {
  models.Result.findAll().then(results => {
    res.status(200).json(results);
  }).catch(error => {
    res.status(404).res.json(error);
  });
});

// create
results.post('/', async (req, res) => {
  models.Result.create({
    userId: req.body.userId,
    testId: req.body.testId,
    status: req.body.status,
    archivedTest: {
      questions: [
        {question1: {
          subjectId: req.body.questions[0].subjectId,
          text: req.body.questions[0].text,
          value: req.body.questions[0].value,
          answers: [
            {answer1: {
              text: req.body.questions[0].answer1.text
            }},
            {answer2: {
              text: req.body.questions[0].answer2.text
            }},
            {answer3: {
              text: req.body.questions[0].answer3.text
            }},
            {answer4: {
              text: req.body.questions[0].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[0].choosenAnswer,
          // points achieved:
        }},
        {question2: {
          subjectId: req.body.questions[1].subjectId,
          text: req.body.questions[1].text,
          value: req.body.questions[1].value,
          answers: [
            {answer1: {
              text: req.body.questions[1].answer1.text
            }},
            {answer2: {
              text: req.body.questions[1].answer2.text
            }},
            {answer3: {
              text: req.body.questions[1].answer3.text
            }},
            {answer4: {
              text: req.body.questions[1].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[1].choosenAnswer,
          // points achieved:
        }},
        {question3: {
          subjectId: req.body.questions[2].subjectId,
          text: req.body.questions[2].text,
          value: req.body.questions[2].value,
          answers: [
            {answer1: {
              text: req.body.questions[2].answer1.text
            }},
            {answer2: {
              text: req.body.questions[2].answer2.text
            }},
            {answer3: {
              text: req.body.questions[2].answer3.text
            }},
            {answer4: {
              text: req.body.questions[2].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[2].choosenAnswer,
          // points achieved:
        }},
        {question4: {
          subjectId: req.body.questions[3].subjectId,
          text: req.body.questions[3].text,
          value: req.body.questions[3].value,
          answers: [
            {answer1: {
              text: req.body.questions[3].answer1.text
            }},
            {answer2: {
              text: req.body.questions[3].answer2.text
            }},
            {answer3: {
              text: req.body.questions[3].answer3.text
            }},
            {answer4: {
              text: req.body.questions[3].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[3].choosenAnswer,
          // points achieved:
        }},
        {question5: {
          subjectId: req.body.questions[4].subjectId,
          text: req.body.questions[4].text,
          value: req.body.questions[4].value,
          answers: [
            {answer1: {
              text: req.body.questions[4].answer1.text
            }},
            {answer2: {
              text: req.body.questions[4].answer2.text
            }},
            {answer3: {
              text: req.body.questions[4].answer3.text
            }},
            {answer4: {
              text: req.body.questions[4].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[4].choosenAnswer,
          // points achieved:
        }},
        {question6: {
          subjectId: req.body.questions[5].subjectId,
          text: req.body.questions[5].text,
          value: req.body.questions[5].value,
          answers: [
            {answer1: {
              text: req.body.questions[5].answer1.text
            }},
            {answer2: {
              text: req.body.questions[5].answer2.text
            }},
            {answer3: {
              text: req.body.questions[5].answer3.text
            }},
            {answer4: {
              text: req.body.questions[5].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[5].choosenAnswer,
          // points achieved:
        }},
        {question7: {
          subjectId: req.body.questions[6].subjectId,
          text: req.body.questions[6].text,
          value: req.body.questions[6].value,
          answers: [
            {answer1: {
              text: req.body.questions[6].answer1.text
            }},
            {answer2: {
              text: req.body.questions[6].answer2.text
            }},
            {answer3: {
              text: req.body.questions[6].answer3.text
            }},
            {answer4: {
              text: req.body.questions[6].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[6].choosenAnswer,
          // points achieved:
        }},
        {question8: {
          subjectId: req.body.questions[7].subjectId,
          text: req.body.questions[7].text,
          value: req.body.questions[7].value,
          answers: [
            {answer1: {
              text: req.body.questions[7].answer1.text
            }},
            {answer2: {
              text: req.body.questions[7].answer2.text
            }},
            {answer3: {
              text: req.body.questions[7].answer3.text
            }},
            {answer4: {
              text: req.body.questions[7].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[7].choosenAnswer,
          // points achieved:
        }},
        {question9: {
          subjectId: req.body.questions[8].subjectId,
          text: req.body.questions[8].text,
          value: req.body.questions[8].value,
          answers: [
            {answer1: {
              text: req.body.questions[8].answer1.text
            }},
            {answer2: {
              text: req.body.questions[8].answer2.text
            }},
            {answer3: {
              text: req.body.questions[8].answer3.text
            }},
            {answer4: {
              text: req.body.questions[8].answer4.text
            }}
          ]
          // chosenAnswer: req.body.questions[8].choosenAnswer,
          // points achieved:
        }},
        {question10: {
          subjectId: req.body.questions[9].subjectId,
          text: req.body.questions[9].text,
          value: req.body.questions[9].value,
          answers: [
            {answer1: {
              text: req.body.questions[9].answer1.text
            }},
            {answer2: {
              text: req.body.questions[9].answer2.text
            }},
            {answer3: {
              text: req.body.questions[9].answer3.text
            }},
            {answer4: {
              text: req.body.questions[9].answer4.text
            }}
          ]
        }}
      ]
      // chosenAnswer: req.body.questions[9].choosenAnswer,
      // pointsAchieved:
    }
  }).then(async result => {
    let promises = [];
    req.body.questions.map(async question => {
      promises.push(models.choosenAnswer.create({resultId: result.id, answerId: choosenAnswer.id, points: question.pointsAchieved}));
    });
    let resp = await Promise.all(promises);
    res.json({resp});
  }).catch(error => {
    res.status(404).json(error);
  });
});
