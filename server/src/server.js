'use strict';

/**
 * Module dependencies.
 */
var config  = require('./config/config');
var logger  = require('./config/logger')(module);

/**
 * Main application entry file.
 * Note that the order of loading is important.
 */

// init the express application
var app = require('./config/express')();

// routes settings
//require('./config/routes')(app);

// Start up the server on the port specified in the config
app.listen(process.env.PORT || config.get('express:port'), function () {
    logger.info(config.get('app:name') + ' app started on port: ' + (process.env.PORT || config.get('express:port')) + ' - with environment: ' + config.get('env'));
});

// Expose app
exports = module.exports = app;