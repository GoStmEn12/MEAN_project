const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const session = require('express-session'); // Подключение express-session
const config = require('./config/db');
const account = require('./routes/account');

const app = express();

const port = 3000;

// Настройка express-session
app.use(
  session({
    secret: config.secret, // Уникальный ключ для подписи сессий
    resave: false,            // Сессии не сохраняются повторно, если они не изменились
    saveUninitialized: true   // Сохранять пустые сессии
  })
);

// Инициализация Passport
app.use(passport.initialize());
app.use(passport.session()); // Поддержка сессий для Passport
require('./config/passport')(passport);

// Использование middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Подключение к базе данных
mongoose.connect(config.db, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on('connected', () => {
  console.log('Мы успешно подключились к БД');
});

mongoose.connection.on('error', (err) => {
  console.log('Мы не подключились к БД: ' + err);
});

// Маршруты
app.get('/', (req, res) => {
  res.send('Главная страничка');
});

app.use('/account', account);

// Запуск сервера
app.listen(port, () => {
  console.log('Сервер запущен на порту ' + port);
});
