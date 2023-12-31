require('dotenv').config();
var createError = require('http-errors');
const session = require('express-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
var authRouter = require('./routes/auth');
var carsRouter = require('./routes/cars');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,   // Replace 'yourSecretKey' with a real secret string
  resave: false,            // This means the session will be saved only if it is modified
  saveUninitialized: false, // This means do not create a session until something is stored
 // You can add other options here as needed, like cookie settings
}));

app.use((req, res, next) => {
  if (req.session.lastViewedCar) {
    res.locals.lastViewedCar = req.session.lastViewedCar;
  }
  next();
});

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/user/favourite/cars', usersRouter);
app.use('/auth', authRouter);
app.use('/cars', carsRouter);

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