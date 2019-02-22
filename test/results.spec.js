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
              models.Test.create({
                name: 'Demo Test',
                time: 30
              })
                .then((test) => {
                  models.Result.create(
                    {
                      userId: test.userId,
                      testId: test.id,
                      status: 'PUBLISHED'
                    }).then((result) => {
                    done();
                  });
                });
            });
        });
    });
  });

  describe('GET /results', function () {
    it('responds with json containing a list of all results', function (done) {
      request(app)
        .get('/results')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /results/:id', function () {
    it('responds with json containing result with given id', function (done) {
      request(app)
        .get('/results/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /results', function () {
    it('creates new result', function (done) {
      let testId = 1;
      let userId = 1;
      let status = 'PUBLISHED';

      request(app)
        .post('/results')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({testId, userId, status})
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /results/:id', function () {
    it('updates result with given id', function (done) {
      let status = 'CLOSED';

      request(app)
        .put('/results/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({status})
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /results/:id', function () {
    it('deletes result with given id', function (done) {
      request(app)
        .delete('/results/1')
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
