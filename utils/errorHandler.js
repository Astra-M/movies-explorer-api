const errorHandler = ((err, req, res, next) => {
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message || 'Что-то пошло не так' });
  }
  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Данные некорректны' });
  }
  res.status(500).send({ message: 'Ошибка сервера' });
  return next(err);
});

module.exports = { errorHandler };
