const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const MongoDBStore = require('connect-mongodb-session')(session);
const cors = require('cors');

var indexRouter = require('./routes/index');
var sitesRouter = require('./routes/sites');
var apiRouter = require('./routes/api');

var app = express();

require('dotenv').config();
require('./config/db');
require('./config/passport');

const sessionStore = new MongoDBStore({
  uri: process.env.MONGODB_CONNECTION_URI,
  collection: 'sessions'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'boomchakalaka',
    cookie: { maxAge: 60000000 },
    resave: true,
    saveUninitialized: true,
    store: sessionStore
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sites', sitesRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
