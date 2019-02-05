const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const questions = require('./controllers/questions');
const users = require('./controllers/users');
const tests = require('./controllers/tests');
const userResults = require('./controllers/userResults');

const swaggerUi = require('swagger-ui-express');
const swaggerFilePath = './docs/swagger.json';

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));

app.use('/questions', questions);
app.use('/users', users);
app.use('/tests', tests);
app.use('/users/:id/results', userResults);

app.listen(process.env.PORT);
