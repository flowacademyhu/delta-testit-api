const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const users = require('./controllers/users');

// const createMiddleware = require('swagger-express-middleware');
// const swaggerUi = require('swagger-ui-express');
// const swaggerFilePath = './config/swagger.json';

const app = express();

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(swaggerFilePath)));

createMiddleware(swaggerFilePath, app, (err, middleware) => {
  if (err) return console.log(err);
  app.use(
    middleware.metadata(),
    middleware.CORS(),
    middleware.files(),
    middleware.parseRequest(),
    middleware.validateRequest()
  );
  app.get('/test', (req, res) => {
    res.json({mukodik: true});
  });

  app.listen(8000);
});*/

app.use('/users', users);

app.listen(process.env.PORT);
