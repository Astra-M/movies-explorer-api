const movieRouter = require('express').Router();
const { createMovie } = require('../controllers/movies');

movieRouter.post('/', createMovie);

module.exports = { movieRouter };
