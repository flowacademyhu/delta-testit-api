/* global describe it before */
const request = require('supertest');
const appCreator = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

let app;

before((done) => {
  appCreator.then(a => {
    app = a;
    done();
  });
});

describe('TestIT API users tests', function () {
  this.timeout(10000);
  before(function (done) {
    models.sequelize.sync({ force: true }).then(() => {
      console.log('Database rebuilt');
      models.Group.create({
        name: 'DemoGroup',
        description: 'This is a demo group'
      })
        .then((group) => {
          models.User.create(
            {
              firstName: 'Adam',
              lastName: 'Admin',
              email: 'adam@admin.com',
              encryptedPassword: '$2b$10$Cb4JfOVfZpJUnoN7VgJGeuWdLcfDxAwFGuPaLUosxoES6gE.CV9gm',
              role: 'ADMIN',
              groupId: group.id
            }
          )
            .then((user) => {
              const token = jwt.sign({
                data: {
                  email: user.email,
                  id: user.id,
                  role: user.role
                }},
              config.JWT_SECRET,
              { expiresIn: '1h' });
              global.token = `Bearer ${token}`;
              console.log('Admin user created');
              models.Subject.create({
                name: 'DemoSubject'
              })
                .then((subject) => {
                  models.Question.create(
                    {
                      subjectId: subject.id,
                      text: 'Demo question text',
                      type: 'True of False',
                      value: 3
                    })
                    .then((question) => {
                      models.Answer.create(
                        {
                          questionId: question.id,
                          text: 'Demo answer text',
                          isCorrect: 'True',
                          picture: null
                        })
                        .then(answer => {
                          done();
                        });
                    });
                });
            });
        });
    });
  });

  describe('GET /answers', function () {
    it('responds with json containing a list of all answers', function (done) {
      request(app)
        .get('/answers')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('POST /answers', function () {
    it('creates new question', function (done) {
      let questionId = 1;
      let text = 'Demo answer text';
      let isCorrect = 'True';
      let picture = null;

      request(app)
        .post('/answers')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({questionId, text, isCorrect, picture})
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /answers/:id', function () {
    it('deletes answer with given id', function (done) {
      request(app)
        .delete('/answers/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
