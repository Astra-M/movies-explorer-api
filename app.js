const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
// const routes = require('./routes');
// const routes = require('./routes/index');
const { router } = require('./routes/index');
const { errorHandler } = require('./utils/errorHandler');

// const { isAuthorized } = require('./middlewares/auth');
// const { userRouter } = require('./routes/users');
// const { movieRouter } = require('./routes/movies');
// const { createUser, login } = require('./controllers/users');

// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const { celebrate, Joi } = require('celebrate');
// const validator = require('validator');
// const { errors } = require('celebrate');
// const cors = require('cors');
// const { userRouter } = require('./routes/users');
// const { cardRouter } = require('./routes/cards');
// const { login, createUser } = require('./controllers/users');
// const { isAuthorized } = require('./middlewares/auth');
// const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

const { PORT = 3001 } = process.env;
app.listen(PORT);

app.use(express.json());

// app.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);

// app.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

// app.use(isAuthorized);

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
        return value;
      }
      return helpers.message('Ссылка введена некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
        return value;
      }
      return helpers.message('Ссылка введена некорректно');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Ссылка введена некорректно');
    }),
    movieId: Joi.number().required(),
  }),
});

// app.use(routes);
app.use(router);

// app.use('/users', userRouter);
// // app.use('/movies', validateMovie, movieRouter);
// app.use('/movies', movieRouter);

// app.use((req, res, next) => {
//   const error = new Error('Страница не существует');
//   error.statusCode = 404;
//   next(error);
// });

app.use(errors());
app.use(errorHandler);

// app.use((err, req, res, next) => {
//   if (err.statusCode) {
//     return res.status(err.statusCode).send({ message: err.message || 'Что-то пошло не так' });
//   }
//   if (err.name === 'CastError') {
//     return res.status(400).send({ message: 'Данные не прошли валидацию' });
//   }
//   res.status(500).send({ message: 'Ошибка сервера' });
//   return next(err);
// });
