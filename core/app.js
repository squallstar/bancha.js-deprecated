/*
@package   Bancha.js
@author    Nicholas Valbusa
@copyright Nicholas Valbusa 2015(C)

---------------------------

Application bootstrap file

*/

// promises for everybody!
require("native-promise-only");

// core libs
var bodyParser = require('body-parser');
var busboy = require('connect-busboy');
var cookieParser = require('cookie-parser');
var compression = require('compression');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');

// framework libs
var config = require('./libs/config').options();
var database = require('./libs/database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.build = Math.round(Date.now()/1000);

// pretty views on local
if(config.env === 'development') {
  app.locals.pretty = true;
  app.disable('view cache');
}

app.use(compression());
app.use(busboy());
app.use(logger('[:date] :remote-addr :method :url :status :response-time ms - :res[content-length]'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public"), {maxage: '1h'}));
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.disable('etag');

// framework middle-wares
app.use('/', require('./libs/middlewares/install'));

// application routes
app.use('/', require('./routes/index'));

// admin routes
app.use('/admin/install', require('./routes/admin/install'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
