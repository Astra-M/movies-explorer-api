// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me

const userRouter = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const { getUserInfo, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getUserInfo);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().custom((value, helpers) => {
      if (validator.isEmail(value)) {
        return value;
      }
      return helpers.message('Email введен некорректно');
    }),
  }),
}), updateUserInfo);

module.exports = { userRouter };

// const {
//   getUsers,
//   getUser,
//   updateUserProfile,
//   updateUserAvatar,
//   getUserProfile,
// } = require('../controllers/users');

// userRouter.get('/', getUsers);
// userRouter.get('/me', getUserProfile);
// userRouter.get('/:id', celebrate({
//   params: Joi.object().keys({
//     id: Joi.string().alphanum().length(24),
//   }),
// }), getUser);

// userRouter.patch('/me', celebrate({
//   body: Joi.object().keys({
//     name: Joi.string().min(2).max(30),
//     about: Joi.string().min(2).max(30),
//   }),
// }), updateUserProfile);

// validate: {
//   validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
//   message: 'Некорректная ссылка',
// },

// userRouter.patch('/me/avatar', celebrate({
//   body: Joi.object().keys({
//     avatar: Joi.string().custom((value, helpers) => {
//       if (validator.isURL(value)) {
//         return value;
//       }
//       return helpers.message('URL is not valid');
//     }),
//   }),
// }), updateUserAvatar);

// module.exports = { userRouter };
