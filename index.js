const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const questions = require('./controllers/questions');

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/questions', questions);

app.listen(process.env.PORT);
