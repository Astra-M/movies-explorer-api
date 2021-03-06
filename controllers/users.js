const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateToken } = require('../middlewares/auth');

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, email }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        throw err;
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        const duplicateError = new Error('Пользователь с таким email уже зарегистрирован');
        duplicateError.statusCode = 409;
        return next(duplicateError);
      }
      return next(err);
    });
};

const getUserInfo = (req, res, next) => {
  User.findById(req.user.id)
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        const err = new Error('Email или пароль неверны');
        err.statusCode = 401;
        throw err;
      }
      const isPasswordValid = bcrypt.compare(password, user.password);
      return Promise.all([isPasswordValid, user]);
    })
    .then(([isPasswordValid, user]) => {
      if (!isPasswordValid) {
        const err = new Error('Email или пароль неверны');
        err.statusCode = 401;
        throw err;
      }
      return generateToken({ id: user._id });
    })
    .then((token) => res.status(200).send({ token }))
    .catch((err) => {
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name: username,
    email: userEmail,
    password: userPassword,
  } = req.body;
  bcrypt.hash(userPassword, 10)
    .then((hash) => {
      User.create({
        name: username,
        email: userEmail,
        password: hash,
      })
        .then((user) => {
          const {
            _id, __v, name, email,
          } = user;
          res.status(201);
          res.send({
            name, email, _id, __v,
          });
        })
        .catch((e) => {
          if (e.name === 'ValidationError') {
            const error = new Error('Некоторые поля заполнены некорректно');
            error.statusCode = 400;
            return next(error);
          }
          if (e.code === 11000) {
            const duplicateError = new Error('Пользователь с таким email уже зарегистрирован');
            duplicateError.statusCode = 409;
            return next(duplicateError);
          }
          return next(e);
        });
    })
    .catch((err) => next(err));
};

module.exports = {
  createUser,
  login,
  getUserInfo,
  updateUserInfo,
};
