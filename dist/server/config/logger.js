'use strict';

var winston = require('winston');

var logger = function(module) {
    //using filename in log statements
    var path = module.filename.split('/').slice(-2).join('/');

    return new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({ json: false, timestamp: true, colorize: true, label: path })
            // new winston.transports.File({ filename: __dirname + '/debug.log', json: false })
        ],
        exceptionHandlers: [
            new (winston.transports.Console)({ json: false, timestamp: true, colorize: true, prettyPrint: true, label: path })
            // new winston.transports.File({ filename: __dirname + '/exceptions.log', json: false })
        ],
        exitOnError: false
    });
};

module.exports = logger;
