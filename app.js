const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const { createRoles } = require('./libs/initialSetup');

const usersRouter = require('./routes/users');
const videogamesRouter = require('./routes/videogames');
const charactersRouter = require('./routes/characters');

const app = express();
createRoles();

dotenv.config({ path: '.env' });

app.use(express.json());
app.use(logger('dev'));

app.use('/users', usersRouter);
app.use('/videogames', videogamesRouter);
app.use('/characters', charactersRouter);

/* ERROR HANDLER */
// error 404
app.use((req, res, next) => {
  const error = new Error('The requested resource doesn`t exists.');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).send({
    error: {
      status: error.status || 500,
      message: error.message || 'Internal Server Error.',
    },
  });
  console.log('***************************************');
  console.log(error);
  console.log('***************************************');
});

module.exports = app;
