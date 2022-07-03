require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');

const options = {
  origin: [
    'http://localhost:3000',
    // 'https://astra.nomoredomains.xyz',
    // 'http://astra.nomoredomains.xyz',
    // 'https://astra-m.github.io',
  ],
  credentials: true,
};

const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

const { PORT = 3001 } = process.env;
app.listen(PORT);
app.use(express.json());

app.use('*', cors(options));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
