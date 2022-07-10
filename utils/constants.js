const corsOptions = {
  origin: [
    'http://api.aurora.nomoredomains.sbs',
    'https://api.aurora.nomoredomains.sbs',
    'http://localhost:3000',
  ],
  credentials: true,
};

module.exports = { corsOptions };
