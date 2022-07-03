const router = require('express').Router();
const { movieRouter } = require('./movies');
const { userRouter } = require('./users');
const { isAuthorized } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { validateUserInfo, validateAuth } = require('../middlewares/validation');

router.post('/signup', validateUserInfo, createUser);
router.post('/signin', validateAuth, login);

router.use(isAuthorized);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  const error = new Error('Страница не существует');
  error.statusCode = 404;
  next(error);
});

module.exports = { router };
