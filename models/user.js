const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  // name — имя пользователя, например: Александр или Мария.
  // Это обязательное поле-строка от 2 до 30 символов.

  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, 'Email некорректный'],
  },
  // email — почта пользователя, по которой он регистрируется.
//  Это обязательное поле, уникальное для каждого пользователя.
//  Также оно должно валидироваться на соответствие схеме электронной почты.
  password: {
    type: String,
    required: true,
    select: false,//возможно, это и не нужно, так как у меня реализовано по-другому
  },
  // password — хеш пароля. Обязательное поле-строка.
  // Нужно задать поведение по умолчанию,
  // чтобы база данных не возвращала это поле.

});

module.exports = mongoose.model('user', userSchema);
