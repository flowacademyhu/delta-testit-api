const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./controllers/users');

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users', users);

app.listen(process.env.PORT);
