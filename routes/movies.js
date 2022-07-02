const movieRouter = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

movieRouter.post('/', createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = { movieRouter };
