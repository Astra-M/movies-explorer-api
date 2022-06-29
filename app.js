const express = require('express');
const mongoose = require('mongoose');

const app = express();
mongoose.connect('mongodb://localhost:27017/moviesdb');

const { PORT = 3001 } = process.env;
app.listen(PORT);
// app.listen(PORT, () => {
//   // Если всё работает, консоль покажет, какой порт приложение слушает
//   console.log(`App listening on port ${PORT}`);
// })