'use strict';

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

Config.prototype.get = function(key) {
    return nconf.get(key);
};

module.exports = new Config();