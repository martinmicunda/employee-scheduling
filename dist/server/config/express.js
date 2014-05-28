'use strict';

/**
 * Module dependencies.
 */
var path            = require('path');
var config          = require('./config');
var morgan          = require('morgan');
var helmet          = require('helmet');
var express         = require('express');
var compress        = require('compression');
var bodyParser      = require('body-parser');
var errorHandler    = require('errorhandler');
var methodOverride  = require('method-override');

module.exports = function () {

    // Initialize express app
    var app = express();

    // Should be placed before express.static
    app.use(compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

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
    // use helmet to secure Express headers
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());
    app.use(helmet.ienoopen());
    app.disable('x-powered-by');

    // Globbing model files
    config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
        require(path.resolve(modelPath));
    });

    // Globbing routing files
    config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
        require(path.resolve(routePath))(app);
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {return next();}

        // Log it
        console.error(err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('404', {
            url: req.originalUrl,
            error: 'Not Found'
        });
    });

    return app;
};

