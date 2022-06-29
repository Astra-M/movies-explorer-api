const mongoose = require('mongoose');
const validator = require('validator');

const filmSchema = new mongoose.Schema({
  // country — страна создания фильма. Обязательное поле-строка.
  country: {
    type: String,
    required: true,
  },
  // director — режиссёр фильма. Обязательное поле-строка.
  director: {
    type: String,
    required: true,
  },
  // duration — длительность фильма. Обязательное поле-число.
  duration: {
    type: Number,
    required: true,
  },
  // year — год выпуска фильма. Обязательное поле-строка.
  year: {
    type: String,
    required: true,
  },
  // description — описание фильма. Обязательное поле-строка.
  description: {
    type: String,
    required: true,
  },
  // image — ссылка на постер к фильму. Обязательное поле-строка.
  //  Запишите её URL-адресом.
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  // trailerLink — ссылка на трейлер фильма. Обязательное поле-строка.
  // Запишите её URL-адресом.
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  // thumbnail — миниатюрное изображение постера к фильму.
  //  Обязательное поле-строка. Запишите её URL-адресом.
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
      message: 'Некорректная ссылка',
    },
  },
  // owner — _id пользователя, который сохранил фильм. Обязательное поле.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  // movieId — id фильма, который содержится в ответе сервиса MoviesExplorer.
  //  Обязательное поле.
  movieId: {
    type: Number,
    required: true,
  },
  // nameRU — название фильма на русском языке. Обязательное поле-строка.
  // Нужно ли валидировать на язык?
  nameRU: {
    type: String,
    required: true,
  },
  // nameEN — название фильма на английском языке. Обязательное поле-строка.
  // Нужно ли валидировать на язык?
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('film', filmSchema);
