'use strict';

/**
 * Module dependencies.
 */
var express         = require('express');
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var errorHandler    = require('errorhandler');
var config          = require('./config');

module.exports = function (app) {

    // initialize static server that will spit out contents of client folder
    app.use(express.static(__dirname + config.get('publicPath')));
    // log every request to the console
    app.use(morgan('dev'));
    // error handler
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    // pull information from html in POST (bodyParser should be above methodOverride)
    app.use(bodyParser());
    // simulate DELETE and PUT
    app.use(methodOverride());

};

