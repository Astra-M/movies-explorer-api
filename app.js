const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
// const { userRouter } = require('./routes/users');
const { createUser, login } = require('./controllers/users');

const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

const { PORT = 3001 } = process.env;
app.listen(PORT);

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    // email: Joi.string().required().custom((value, helpers) => {
    //   if (validator.isEmail(value)) {
    //     return value;
    //   }
    //   return helpers.message('Email введен некорректно');
    // }),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// app.use('/users', userRouter);

// app.use(errorLogger);

app.use((req, res, next) => {
  const error = new Error('This page does not exist');
  error.statusCode = 404;
  next(error);
});

app.use(errors());

app.use((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Что-то пошло не так' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
  return next(err);
});





// app.listen(PORT, () => {
//   // Если всё работает, консоль покажет, какой порт приложение слушает
//   console.log(`App listening on port ${PORT}`);
// })