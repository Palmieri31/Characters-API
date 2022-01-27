const express = require('express');
const dotenv = require('dotenv');
const logger = require('morgan');
const { createRoles } = require('./libs/initialSetup');

const app = express();
createRoles();

dotenv.config({ path: '.env' });

app.use(express.json());
app.use(logger('dev'));

module.exports = app;