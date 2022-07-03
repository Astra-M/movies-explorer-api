const { Joi, celebrate } = require('celebrate');
const { validator } = require('validator');

const validateUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    // email: Joi.string().custom((value, helpers) => {
    //   if (validator.isEmail(value)) {
    //     return value;
    //   }
    //   return helpers.message('Email введен некорректно');
    // }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required(),

    // image: Joi.string().required().custom((value, helpers) => {
    //   if (validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
    //     return value;
    //   }
    //   return helpers.message('Ссылка введена некорректно');
    // }),
    // trailerLink: Joi.string().required().custom((value, helpers) => {
    //   if (validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true })) {
    //     return value;
    //   }
    //   return helpers.message('Ссылка введена некорректно');
    // }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().required().uri(),
    // thumbnail: Joi.string().required().custom((value, helpers) => {
    //   if (validator.isURL(value)) {
    //     return value;
    //   }
    //   return helpers.message('Ссылка введена некорректно');
    // }),
    // thumbnail: Joi.string().required().custom((value) => {
    //   if (validator.isURL(value)) {
    //     return value;
    //   }
    //   const notUrlError = new Error('Введенные данные не соответствуют формату ссылки');
    //   notUrlError.statusCode = 400;
    //   // return next(error);
    //   return notUrlError;
    // }),
    movieId: Joi.number().required(),
  }),
});

module.exports = {
  validateMovie,
  validateUserInfo,
  validateUpdateUser,
  validateAuth,
};
