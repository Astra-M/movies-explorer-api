const { NODE_ENV, JWT_SECRET } = process.env;
const jwt = require('jsonwebtoken');

const generateToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

module.exports = { generateToken };
