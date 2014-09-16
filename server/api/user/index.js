'use strict';

var express = require('express');
var user = require('./user.controller');
var auth = require('../../authentication/authentication');

module.exports = function(app) {
    var usersRoute = express.Router();
        usersRoute.post('/', user.create);
        usersRoute.get('/', user.get);

    app.use('/api/users', usersRoute);
};
