const Movie = require('../models/movie');

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        const err = new Error('Фильм не найден');
        err.statusCode = 404;
        return next(err);
      }
      const movieOwner = movie.owner.toString();
      if (movieOwner !== req.user.id) {
        const err = new Error('Вы можете удалять только свои фильмы');
        err.statusCode = 403;
        return next(err);
      }
      return Movie.findByIdAndRemove(req.params.movieId)
        .then(() => res.status(200).send({ message: 'Фильм удален' }))
        .catch((err) => next(err));
    })
    .catch((err) => next(err));
};

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user.id })
    .then((movies) => res.status(200).send(movies))
    .catch(next);
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
      }
      return next(err);
    });
};

module.exports = { createMovie, getMovies, deleteMovie };
