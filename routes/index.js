const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const { isAuthorized } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateUserInfo, validateAuth } = require('../middlewares/validation');

// router.post('/signup', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), createUser);

router.post('/signup', validateUserInfo, createUser);
router.post('/signin', validateAuth, login);

// router.post('/signin', celebrate({
//   body: Joi.object().keys({
//     email: Joi.string().required().email(),
//     password: Joi.string().required(),
//   }),
// }), login);

router.use(isAuthorized);

router.use('/users', userRouter);
// app.use('/movies', validateMovie, movieRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  const error = new Error('Страница не существует');
  error.statusCode = 404;
  next(error);
});

module.exports = { router };
