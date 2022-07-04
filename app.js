require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { corsOptions, mongooseUrl } = require('./utils/constants');

const app = express();
mongoose.connect(mongooseUrl);

const { PORT = 3001 } = process.env;
app.listen(PORT);
app.use(express.json());

app.use('*', cors(corsOptions));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
