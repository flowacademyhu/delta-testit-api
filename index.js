const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const questions = require('./controllers/questions');
const users = require('./controllers/users');
const tests = require('./controllers/tests');
<<<<<<< HEAD
=======
const answer = require('./controllers/answer');
>>>>>>> e5222e7d1a1453c941c2376ea74abbebcc66a255
const userResults = require('./controllers/userResults');

// const swaggerUi = require('swagger-ui-express');
// const swaggerFilePath = './docs/swagger.json';
// const createMiddleware = require('swagger-express-middleware');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));

app.use('/questions', questions);
app.use('/users', users);
app.use('/tests', tests);
<<<<<<< HEAD
=======
app.use('/answer', answer);
>>>>>>> e5222e7d1a1453c941c2376ea74abbebcc66a255
app.use('/users/:userId/results', userResults);

/*
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
*/

app.listen(process.env.PORT);
