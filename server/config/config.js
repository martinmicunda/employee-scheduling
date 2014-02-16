var path = require('path'),
    nconf = require('nconf');

// store a nested JSON representation of the configuration into in-memory storage engine
nconf.argv().env().use('memory');

// set a environment variable on `nconf`
var env = nconf.get("NODE_ENV") || "development";
nconf.set("env", env);

// set an app root path variable on `nconf`
var appRoot = path.normalize(__dirname + '/../../');
nconf.set("appRoot", appRoot);

// load app configuration
nconf.file("all", __dirname + "/env/all.json");
nconf.file(env, __dirname + "/env/" + env + ".json");

module.exports = nconf