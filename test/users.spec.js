/* global describe it before */
const request = require('supertest');
const app = require('../index');
const models = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

describe('TestIT API users tests', function () {
  this.timeout(10000);
  before(function (done) {
    models.sequelize.sync({ force: true }).then(() => {
      console.log('Database rebuilt');
      models.Group.create({
        name: 'DemoGroup'
      })
        .then(
          models.User.create(
            {
              firstName: 'Adam',
              lastName: 'Admin',
              email: 'adam@admin.com',
              encryptedPassword: '$2b$10$Cb4JfOVfZpJUnoN7VgJGeuWdLcfDxAwFGuPaLUosxoES6gE.CV9gm',
              role: 'ADMIN',
              groupId: 1,
              lastLogin: new Date(),
              createdAt: new Date(),
              updatedAt: new Date()
            }
          ).then((user) => {
            global.token = jwt.sign(
              {
                email: user.email,
                id: user.id,
                role: user.role
              },
              config.JWT_SECRET,
              { expiresIn: '1h' });
            console.log('Admin user created');
            done();
          }));
    });
  });

  describe('GET /users', function () {
    it('respond with json containing a list of all users', function (done) {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /user/:id', function () {
    it('respond with json user not found', function (done) {
      request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});

describe('PUT /users', function () {
  it('respond with json containing the updated user', function (done) {
    request(app)
      .put('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});
