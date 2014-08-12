'use strict';

var express = require('express');
var passport = require('passport');
var auth = require('../authentication');

var router = express.Router();

router.post('/login', function(req, res, next) {
//        var user = {id: "idr234", name: "martin"};
//    var token = auth.issueToken(user);
//
//    res.jsonp({token: token});
    passport.authenticate('local', function (err, user, info) {
        var error = err || info;
        if (error) return res.json(401, error);
        if (!user) return res.json(404, {message: 'Something went wrong, please try again.'});

//        var token = auth.signToken(user._id, user.role);
        res.json({token: auth.issueToken(user)});
    })(req, res, next)
});

router.get('/logout', function(req, res) {
//    if (req.user) {
    auth.expireToken(req.headers);

//        delete req.user;
    return res.send(200);
//    }
//    else {
//        return res.send(401);
//    }
});

module.exports = router;