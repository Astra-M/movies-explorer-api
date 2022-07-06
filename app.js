require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');
const { router } = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorHandler } = require('./utils/errorHandler');
const { corsOptions } = require('./utils/constants');

const { MONGOOSE_URL, PORT = 3001 } = process.env;

const app = express();
mongoose.connect(MONGOOSE_URL);
app.listen(PORT);
app.use(express.json());

app.use('*', cors(corsOptions));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);
