require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Conexão com o banco de dados
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    app.emit('iniciado');
  })
  .catch(e => {
    console.log('Conexão com o banco de dados falhou');
    console.log(e);
  });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flashMessage = require('connect-flash');
const routes = require('./routes');
const path = require('path');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { middlewareGlobal, checkCsrfError, csrfMiddleware } = require('./src/middlewares/middleware');

// Configurando a sessão
const sessionOptions = session({
  secret: 'ajsa918u2jsaj19sak10',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});
app.use(sessionOptions);
app.use(flashMessage());

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(csrf());
// Middlewares globais
app.use(middlewareGlobal);
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);
app.on('iniciado', () => {
  app.listen(3000, () => {
    console.log('Servidor iniciado com sucesso!');
    console.log('Acessar: http://localhost:3000');
  });
});