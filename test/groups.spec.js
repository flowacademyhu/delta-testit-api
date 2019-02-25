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

describe('TestIT API groups tests', function () {
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

  describe('GET /groups', function () {
    it('responds with json containing a list of all groups', function (done) {
      request(app)
        .get('/groups')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200, done);
    });
  });

  describe('GET /groups/:id', function () {
    it('responds with json containing group with given id', function (done) {
      request(app)
        .get('/groups/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('POST /groups', function () {
    it('creates new group', function (done) {
      let name = 'DemoGroup 2';
      let description = 'This is another demo group';

      request(app)
        .post('/groups')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({name, description})
        .expect(201)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });

  describe('PUT /groups/:id', function () {
    it('updates group with given id', function (done) {
      let name = 'Deltix';
      let description = 'This is a nice demo group';

      request(app)
        .put('/groups/1')
        .set('Accept', 'application/json')
        .set('Authorization', global.token)
        .send({name, description})
        .expect(200)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
