const corsOptions = {
  origin: [
    'http://api.aurora.nomoredomains.sbs',
    'https://api.aurora.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};

const mongooseUrl = 'mongodb://localhost:27017/moviesdb';

module.exports = { corsOptions, mongooseUrl };
