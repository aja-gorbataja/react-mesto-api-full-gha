require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');

const { MONGO_URL = 'mongodb://127.0.0.1:27017/mestodb', PORT = 3000 } = process.env;
const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());

mongoose.connect(MONGO_URL);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { status = 500, message } = err;
  res.status(status).send({ message: status === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

app.listen(PORT);
