const Movie = require('../models/movie');

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        const err = new Error('Фильм не найден');
        err.statusCode = 404;
        return next(err);
      }
      //сделать валидацию когда больше или меньше знаков, иначе выдается
      //в консоли ошибка, помимо ошибки сервера, либо мидлварой,
      //либо в иф каст еррор прописать
      const movieOwner = movie.owner.toString();
      if (movieOwner !== req.user.id) {
        const err = new Error('Вы можете удалять только свои фильмы');
        err.statusCode = 403;
        return next(err);
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        // .catch((err) => next(err));
        .catch(next);
    })
    // .catch((err) => next(err));
    .catch(next);
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        const err = new Error('Вы пока не сохранили ни одного фильма');
        err.statusCode = 404;
        // throw err;
        return next(err);
      }
      return res.status(200).send(movies);
    })
    .catch((err) => {
      next(err);
    });
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user.id,
  })
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new Error('Некоторые поля заполнены некорректно');
        error.statusCode = 400;
        return next(error);
        // throw error;
      }
      return next(err);
    });
};

module.exports = { createMovie, getMovies, deleteMovie };
