const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');

const questions = require('./controllers/questions');
const users = require('./controllers/users');
const tests = require('./controllers/tests');
const answers = require('./controllers/answers');
const subjects = require('./controllers/subjects');
const userResults = require('./controllers/userResults');
const userLogin = require('./controllers/userLogin');
const testQuestions = require('./controllers/testQuestions');

const swaggerUi = require('swagger-ui-express');
const swaggerFilePath = './docs/swagger.json';
const createMiddleware = require('swagger-express-middleware');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));

createMiddleware(swaggerFilePath, app, (err, middleware) => {
  if (err) return console.log(err);
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest()
  );
});

app.use('/users/login', userLogin);
app.use('/questions', questions);
app.use('/users', users);
app.use('/tests', tests);
app.use('/answers', answers);
app.use('/subjects', subjects);
app.use('/users/:userId/results', userResults);
app.use('/testQuestions', testQuestions);

app.listen(process.env.PORT);
