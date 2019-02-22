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
              global.token = jwt.sign(
                {
                  email: user.email,
                  id: user.id,
                  role: user.role
                },
                config.JWT_SECRET,
                { expiresIn: '1h' });
              console.log('Admin user created');
              models.Subject.create({
                name: 'Demo Subject'
              })
                .then((subject) => {
                  done();
                });
            });
        });
    });
  });

  describe('GET /subjects', function () {
    it('responds with json containing a list of all subjects', function (done) {
      request(app)
        .get('/subjects')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /subjects/:id', function () {
    it('responds with json containing subject with given id', function (done) {
      request(app)
        .get('/subjects/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /subjects', function () {
    it('creates new subject', function (done) {
      let name = 'Java';

      request(app)
        .post('/subjects')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({name})
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /subjects/:id', function () {
    it('updates subject with given id', function (done) {
      let name = 'Angular';

      request(app)
        .put('/subjects/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({name})
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /subjects/:id', function () {
    it('deletes subject with given id', function (done) {
      request(app)
        .delete('/subjects/1')
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
