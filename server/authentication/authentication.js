'use strict';

var jwt = require('jsonwebtoken');
var expressJwt  = require('express-jwt');
// TODO: look how chico did redis he create two modes one for chatting and other for store
//var redisClient = require('../config/redis').redisClient;

var TOKEN_EXPIRATION = 60;
var TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;
var TOKEN_SECRET = 'employee-scheduling';

exports.TOKEN_SECRET = TOKEN_SECRET;

// Middleware for token verification
exports.verifyToken = function (req, res, next) {
    var token = getToken(req.headers);

//    redisClient.get(token, function (err, reply) {
//        if (err) {
//            console.log(err);
//            return res.send(500);
//        }
//
//        if (reply) {
//            res.send(401);
//        }
//        else {
//            next();
//        }
//
//    });
};

exports.expireToken = function(headers) {
    var token = getToken(headers);

    if (token != null) {
//        redisClient.set(token, { is_expired: true });
//        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};

exports.issueToken = function(payload) {
    /**
     * Token is divided in 3 parts:
     *  - header
     *  - payload (It contains some additional information that we can pass with token e.g. {user: 2, admin: true}. This gets encoded into base64.)
     *  - signature
     *
     * Token is something like xxxxxxxxxxx.yyyy.zzzzzzzzzzzz. Where the x is the encoded header, the y is the encoded payload and
     * the z is the signature. So on front-end we can decode the yyyy part (the payload) if we need.
     */
    var token = jwt.sign(payload, process.env.TOKEN_SECRET || TOKEN_SECRET, { expiresInMinutes: TOKEN_EXPIRATION });
    return token;
};

// Validate jwt
exports.isAuthenticated = function() {
    return expressJwt({secret: TOKEN_SECRET})
};

exports.isAuthorized = function() {
    return true;
};

var getToken = function(headers) {
    var token = null;
    if (headers && headers.authorization) {
        var parts = headers.authorization.split(' ');
        if (parts.length == 2) {
            token = parts[1];

            return token;
        }
        else {
            console.log('Bad authorization: Bearer [' + token + ']');
            return null;
        }
    }
    else {
        console.log('The token is not valid');
        return null;
    }
};
