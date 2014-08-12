'use strict';

var User = require('./user.model.js');

/**
 * Create new user
 *
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @returns {*}
 */
exports.create = function(req, res) {
    // For security measurement we remove the roles from the req.body object
    delete req.body.roles;

    // TODO (martin): only admin can create new user so the password should be automatically generate and email should be
    // send to the user with instruction how to login etc.. So below code should be removed in the future
    var email = req.body.email || '';
    var password = req.body.password || '';
    var passwordConfirmation = req.body.passwordConfirmation || '';

    if (email == '' || password == '' || password != passwordConfirmation) {
        return res.send(400);
    }

    // Init Variables
    var user = new User(req.body);

    // Add missing user fields
    user.displayName = user.firstName + ' ' + user.lastName;
//    user.updated = Date.now;
    user.provider = 'local';
//    user.role = {
//        bitMask: 2,
//        title: "user"
//    };

    // Then save the user
    user.save(function(err) {
        if (err) {
            console.log(err);
            return res.send(500);
        }
        return res.send(200);
    });
};

exports.get = function(req,res) {
    // get all the bears (accessed at GET http://localhost:8080/api/bears)
    User.find(function(err, users) {
        if (err)
            res.send(err);

        res.json(users);
    });
};
