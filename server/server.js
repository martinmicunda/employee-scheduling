'use strict';

/**
 * Module dependencies.
 */
var pkg     = require('../package.json');
var colors  = require('colors');
var config  = require('./config/config');
var logger  = require('mm-node-logger')(module);
var mongodb = require('mm-mongoose-connection');
var express = require('./config/express');

/**
 * Main application entry file.
 * Note that the order of loading is important.
 */

// init the express application
var app = express();

// start mongodb
mongodb(config.get('mongodb'), function startServer() {
    console.log('Startup: Loading modules...');

    require('./api/user')(app);

    // modules
    require('./authentication')(app);

    app.use(function (err, req, res, next) {
        if (err.constructor.name === 'UnauthorizedError') {
            res.send(401, 'Unauthorized');
        }
    });

    /**
     * THIS CODE IS REQUIRED TO USE HTML5 MODE IN ANGULARJS
     */
    app.route('/*').get(function (req, res, next) {
        res.redirect('/#' + req.originalUrl);
        // Just send the index.html for other files to support HTML5Mode
    //    res.sendfile('index.html', { root: __dirname });
    });

    // start up the server on the port specified in the config after we connected to mongodb
    app.listen(process.env.PORT || config.get('express:port'), function () {
        var serverBanner = ['',
            '*************************************' + ' EXPRESS SERVER '.yellow + '********************************************',
            '*',
            '* ' + 'E-scheduling '.green + 'v'.red + pkg.version.red + ' Copyright (C) 2014-2014 Martin Micunda'.green,
            '* ' + config.get('app:name').green + ' app started on port: '.green + (process.env.PORT || config.get('express:port')) + ' - with environment: '.green + config.get('env').red,
            '*',
            '*************************************************************************************************',
            ''].join('\n');
        logger.info(serverBanner);
    });
});

// https://github.com/onmodulus/modulus-cli/blob/master/lib%2Fmodulus.js
//modulus.printHeader = function() {
//    modulus.io.print('   __    __   ______   _____    __  __   __       __  __   ______   '.verbose);
//    modulus.io.print('  /\\ "-./  \\ /\\  __ \\ /\\  __-. /\\ \\/\\ \\ /\\ \\     /\\ \\/\\ \\ /\\  ___\\  '.verbose);
//    modulus.io.print('  \\ \\ \\-./\\ \\\\ \\ \\/\\ \\\\ \\ \\/\\ \\\\ \\ \\_\\ \\\\ \\ \\____\\ \\ \\_\\ \\\\ \\___  \\ '.verbose);
//    modulus.io.print('   \\ \\_\\ \\ \\_\\\\ \\_____\\\\ \\____- \\ \\_____\\\\ \\_____\\\\ \\_____\\\\/\\_____\\'.verbose);
//    modulus.io.print('    \\/_/  \\/_/ \\/_____/ \\/____/  \\/_____/ \\/_____/ \\/_____/ \\/_____/'.verbose);
//    modulus.io.print('');
//    modulus.io.print('     Providing all the awesomeness that is Modulus, in a CLI.'.verbose);
//    modulus.io.print('     https://modulus.io/codex/cli/using_the_cli'.verbose);
//    modulus.io.print('');
//};

// Expose app
exports = module.exports = app;
