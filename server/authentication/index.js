'use strict';

var express = require('express');
var User = require('../api/user/user.model');
var config  = require('../config/config');

module.exports = function(app) {
    // Passport Configuration
    require('./local/passport').setup(User, config);

    var router = express.Router();

    router.use('/local', require('./local'));

    app.use('/auth', router);
};