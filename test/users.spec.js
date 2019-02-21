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
        models.User.bulkCreate(
          {
            firstName: 'Adam',
            lastName: 'Admin',
            email: 'adam@admin.com',
            encryptedPassword: '$2b$10$Cb4JfOVfZpJUnoN7VgJGeuWdLcfDxAwFGuPaLUosxoES6gE.CV9gm',
            role: 'ADMIN',
            groupId: group.id,
            lastLogin: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            firstName: 'Stewart',
            lastName: 'Student',
            email: 'stewart@student.com',
            encryptedPassword: '$2b$10$EoGUW0Mz342heoxa3JZolOEFZQPkOgYw1R9I10lVj7F4tiJlPsRRi',
            role: 'STUDENT',
            groupId: group.id,
            lastLogin: new Date(),
            createdAt: new Date(),
            updatedAt: new Date()
          },
          {
            firstName: 'Melvin',
            lastName: 'Mentor',
            email: 'melvin@mentor.com',
            encryptedPassword: '$2b$10$vIZLboRowKILueNLeMTvEeYzjisZN86obb/WV0VMtNaT3ZquneU8O',
            role: 'MENTOR',
            groupId: group.id,
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
        });
      );
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
        .get('/users/11')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect(400)
        .end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
