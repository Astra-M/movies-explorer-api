const movieRouter = require('express').Router();
// const { validator } = require('validator');
const { validateMovie } = require('../middlewares/validation');
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');

movieRouter.post('/', validateMovie, createMovie);
movieRouter.get('/', getMovies);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = { movieRouter };
