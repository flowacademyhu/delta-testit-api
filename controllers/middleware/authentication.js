const jwt = require('jsonwebtoken');
const models = require('../../models');
const config = require('../../config/config');
const endpoints = {
  'GET /users': ['MENTOR', 'ADMIN'],
  'GET /users/{id}': ['STUDENT', 'MENTOR', 'ADMIN'],
  'POST /users': ['MENTOR', 'ADMIN'],
  'PUT /users/{id}': ['STUDENT', 'MENTOR', 'ADMIN'],
  'DELETE /users/{id}': ['MENTOR', 'ADMIN'],

  'GET /questions': ['MENTOR', 'ADMIN'],
  'GET /questions/{id}': ['MENTOR', 'ADMIN'],
  'POST /questions': ['MENTOR', 'ADMIN'],
  'PUT /questions/{id}': ['MENTOR', 'ADMIN'],
  'DELETE /questions/{id}': ['MENTOR', 'ADMIN'],

  'GET /tests': ['MENTOR', 'ADMIN'],
  'GET /tests/{id}': ['MENTOR', 'ADMIN'],
  'POST /tests': ['MENTOR', 'ADMIN'],
  'PUT /tests/{id}': ['MENTOR', 'ADMIN'],
  'DELETE /tests/{id}': ['MENTOR', 'ADMIN'],

  'POST /user/login': ['STUDENT', 'MENTOR', 'ADMIN'],
  'GET /users/{id}/results': ['STUDENT', 'MENTOR', 'ADMIN'],

  'GET /': ['anonymus']

};
module.exports = (req, res, next) => {
  const endpoint = `${req.method} ${req.swagger.pathName}`;
  if (!req.headers.authorization && endpoints[endpoint].includes('anonymus')) {
    return next();
  }
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, config.JWT_SECRET);
  const userId = decoded.id;
  models.User.findById(userId)
    .then(user => {
      req.user = user;
      if (endpoints[endpoint].includes(user.role)) {
        next();
      } else {
        res.status(403).send('Unauthorized');
      }
    });
};
