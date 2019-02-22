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

describe('TestIT API tests tests', function () {
  this.timeout(10000);
  before(function (done) {
    models.sequelize.sync({ force: true }).then(() => {
      console.log('Database rebuilt');
      models.Group.create({
        name: 'DemoGroup',
        description: 'This is a demo group'
      })
        .then((group) => {
          models.User.create({
            firstName: 'Adam',
            lastName: 'Admin',
            email: 'adam@admin.com',
            encryptedPassword: '$2b$10$Cb4JfOVfZpJUnoN7VgJGeuWdLcfDxAwFGuPaLUosxoES6gE.CV9gm',
            role: 'ADMIN',
            groupId: group.id
          }).then(user => {
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
              userId: user.id,
              name: 'Demo Test',
              time: 30
            }).then((test) => {
              done();
            });
          });
        });
    });
  });

  describe('GET /tests', function () {
    it('responds with json containing a list of all tests', function (done) {
      request(app)
        .get('/tests')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /tests/:id', function () {
    it('responds with json containing test with given id', function (done) {
      request(app)
        .get('/tests/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /tests', function () {
    it('creates new user', function (done) {
      let userId = 1;
      let name = 'Demo Test 2';
      let time = 30;

      request(app)
        .post('/tests')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({ userId, name, time })
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /tests/:id', function () {
    it('updates test with given id', function (done) {
      let time = 35;

      request(app)
        .put('/tests/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({ time })
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /tests/:id', function () {
    it('deletes test with given id', function (done) {
      request(app)
        .delete('/tests/1')
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
