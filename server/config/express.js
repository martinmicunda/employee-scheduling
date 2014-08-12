'use strict';

/**
 * Module dependencies.
 */
var path            = require('path');
var config          = require('./config');
var morgan          = require('morgan');
var helmet          = require('helmet');
var logger          = require('mm-node-logger')(module);
var express         = require('express');
var compress        = require('compression');
var passport        = require('passport');
var bodyParser      = require('body-parser');
var errorHandler    = require('errorhandler');
var methodOverride  = require('method-override');
var expressJwt = require('express-jwt');

module.exports = function () {
    /**
     * Millis conversions cheat sheet:
     * 1 second: 1000
     * 1 minute: 60000
     * 10 minutes: 600000
     * 30 minutes: 1800000
     * 1 hour: 3600000
     * 12 hours: 43200000
     * 24 hours: 86400000
     * 1 week: 604800000
     */
    var oneDay = 86400000;

    // Initialize express app
    var app = express();

    // Should be placed before express.static
//    app.use(compress({
//        filter: function(req, res) {
//            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
//        }
//    }));

    // initialize static server that will spit out contents of client folder
//    app.use(express.static(__dirname + config.get('publicPath'), { maxAge: oneDay }));
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

    // use the passport package in our application
    app.use(passport.initialize());
    app.use(passport.session());

//    var session = require('express-session');
//    // Use express session support since OAuth2orize requires it
//    app.use(session({
//        secret: 'Super Secret Session Key',
//        saveUninitialized: true,
//        resave: true
//    }));

    // Globbing model files
//    config.getGlobbedFiles('../models/**/*.js').forEach(function(modelPath) {
//        require(path.resolve(modelPath));
//    });
//
//    // Globbing routing files
//    config.getGlobbedFiles('../routes/**/*.js').forEach(function(routePath) {
//        require(path.resolve(routePath))(app);
//    });

    // setup CORS
    app.all('*', function(req, res, next) {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Credentials', true);
        res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
        res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Authorization');
        if ('OPTIONS' == req.method) return res.send(200);
        next();
    });

    // Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like, set properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // If the error object doesn't exists
        if (!err) {return next();}

        // Log it
        logger.error('Internal error(%d): %s',res.statusCode,err.stack);

        // Error page
        res.status(500).render('500', {
            error: err.stack
        });
    });

    // Assume 404 since no middleware responded
//    app.use(function(req, res) {
//        logger.error('Not found URL: %s',req.url);
////        res.status(404).render('404', {
////            url: req.originalUrl,
////            error: 'Not Found'
////        });
//        res.status(404);
//        res.send();
//    });

// Register all our routes with /api
//    app.use('/api', app.router);

//    /**
//     * THIS CODE IS REQUIRED TO USE HTML5 MODE IN ANGULARJS
//     *
//     * Send our main angular html file if any link without dot is requested, e.g. 'http://someurl/about'
//     * this is our actual server side redirect, we don't send index.html when there's dot in link assuming
//     * such a request is for static data like .js, .css or .html
//     */
//    app.route('/[^.]+$').get(function (req, res, next) {
//        res.redirect('/#' + req.originalUrl);
//    });

    return app;
};

