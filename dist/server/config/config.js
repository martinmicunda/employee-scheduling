'use strict';

/**
 * Module dependencies.
 */
var _     = require('lodash');
var glob  = require('glob');
var nconf = require('nconf');

function Config(){
    // store a JSON representation of the configuration into in-memory storage engine
    nconf.argv().env().use('memory');

    // set a environment variable on `nconf`
    var env = nconf.get('NODE_ENV') || 'development';
    nconf.set('env', env);

    // load app configuration
    nconf.file('all', __dirname + '/env/all.json');
    nconf.file(env, __dirname + '/env/' + env + '.json');
}

/**
 * Get config env data by key
 */
Config.prototype.get = function(key) {
    return nconf.get(key);
};

/**
 * Get files by glob patterns
 */
Config.prototype.getGlobbedFiles = function(globPatterns, removeRoot) {
    // For context switching
    var _this = this;

    // URL paths regex
    var urlRegex = new RegExp('^(?:[a-z]+:)?//', 'i');

    // The output array
    var output = [];

    // If glob pattern is array so we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(function(globPattern) {
            output = _.union(output, _this.getGlobbedFiles(globPattern, removeRoot));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            glob(globPatterns, {
                sync: true
            }, function(err, files) {
                if (removeRoot) {
                    files = files.map(function(file) {
                        return file.replace(removeRoot, '');
                    });
                }

                output = _.union(output, files);
            });
        }
    }

    return output;
};

module.exports = new Config();