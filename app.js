'use strict';

var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var dotenv = require('dotenv');

var app = express();

//SETUP MONGOOSE DB CONNECTION
var mongoose = require('mongoose');
var mongoUrl = process.env.MONGOLAB_URI || 'mongodb://localhost/foodielove';
mongoose.connect(mongoUrl, function(err) {
  if(err) {
    console.log('Mongo error:', err);
  } else {
    console.log(`MongoDB connected to ${mongoUrl}`);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
//USING EJS
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ONLY USING ONE ROUTE, ANGULAR IS RENDERING PAGES CLIENT SIDE
app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

module.exports = app;
