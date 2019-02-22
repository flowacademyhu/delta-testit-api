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
                      subjectId: 1,
                      text: 'Demo text',
                      type: 'True of False',
                      value: 3
                    }).then((question) => {
                    done();
                  });
                });
            });
        });
    });
  });

  describe('GET /questions', function () {
    it('responds with json containing a list of all questions', function (done) {
      request(app)
        .get('/questions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /questions/:id', function () {
    it('responds with json containing question with given id', function (done) {
      request(app)
        .get('/questions/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /questions', function () {
    it('creates new question', function (done) {
      let subjectId = 1;
      let text = 'Demo question';
      let picture = null;
      let type = 'True or False';
      let value = 2;

      request(app)
        .post('/questions')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({subjectId, text, picture, type, value})
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /questions/:id', function () {
    it('updates question with given id', function (done) {
      let text = 'This is a demo question';

      request(app)
        .put('/questions/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({text})
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /questions/:id', function () {
    it('deletes question with given id', function (done) {
      request(app)
        .delete('/questions/1')
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
