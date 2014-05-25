//"use strict";
//
///**
// * Module dependencies.
// */
//var express = require('express');
////    stylus = require('stylus');
//
//module.exports = function (app, config) {
//
//    app.set('showStackError', true);
//
//    //Prettify HTML
//    app.locals.pretty = true;
//
//
//    // Middleware to compile `styl` files to `css`.
//    // For example, `client/src/assets/stylesheets/stylus` will be compiled to `client/src/assets/stylesheets/css`
////    app.use(stylus.middleware({
////        // Source directory
//////        src: config.get("appRoot") + 'client/src/assets/stylesheets/stylus',
////        src: config.get("appRoot") + '/client',
////        // Destination directory
//////        dest: config.get("appRoot") + 'client/src/assets/stylesheets/css',
////        // Compile function
////        compile: function(str, path) {
////            return stylus(str)
////                .set('filename', path);
////        }
////    }));
//
//    // all environments
//    app.configure(function () {
//        app.use(express.logger('dev'));
//        app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
//
//        //bodyParser should be above methodOverride
//        app.use(express.bodyParser());  // pull information from html in POST
//        app.use(express.methodOverride());  // simulate DELETE and PUT
//
//        //routes should be at the last
//        app.use(app.router);
//
//        //Set views path, template engine and default layout
//        app.set('views', config.get("appRoot") + 'server/views');
//        app.set('view engine', 'jade');
//
//        //TODO: (martin) the static directory should be '/client' but for some reason 'grunt bower-install' generate wrong directory into head.jade (figure out why this is happening)
//        //app.use(express.static(config.root + '/client'));
//        app.use(express.static(config.get("appRoot")));
//    });
//};

"use strict";

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
    app.use(express.static(__dirname + config.get("publicPath")));
    // log every request to the console
    app.use(morgan('dev'));
    // error handler
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
    // pull information from html in POST (bodyParser should be above methodOverride)
    app.use(bodyParser());
    // simulate DELETE and PUT
    app.use(methodOverride());

};

