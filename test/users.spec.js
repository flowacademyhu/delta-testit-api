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
          ).then((user) => {
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
            done();
          });
        });
    });
  });

  describe('GET /users', function () {
    it('responds with json containing a list of all users', function (done) {
      request(app)
        .get('/users')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /users/:id', function () {
    it('responds with json containing user with given id', function (done) {
      request(app)
        .get('/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /users', function () {
    it('creates new user', function (done) {
      let firstName = 'Stewart';
      let lastName = 'Student';
      let email = 'stewart@admin.com';
      let password = 'stewart';
      let role = 'STUDENT';
      let groupId = 1;

      request(app)
        .post('/users')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({role, firstName, lastName, email, password, groupId})
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /users/:id', function () {
    it('updates user with given id', function (done) {
      let firstName = 'Stephen';

      request(app)
        .put('/users/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({firstName})
        .expect(200)
        .end((err, res) => {
          console.log(err, res);
          if (err) return done(err);
          done();
        });
    });
  });

  describe('DELETE /users/:id', function () {
    it('deletes user by id with given id', function (done) {
      request(app)
        .delete('/users/1')
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
