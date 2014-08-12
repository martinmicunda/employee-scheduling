'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var authTypes = ['github', 'twitter', 'facebook', 'google'];

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function(property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy password
 */
var validateLocalStrategyPassword = function(password) {
    return (this.provider !== 'local' || (password && password.length > 6));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true,
        lowercase: true,
        validate: [validateLocalStrategyProperty, 'Please fill in your email'],
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        validate: [validateLocalStrategyPassword, 'Password should be longer']
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    role: {
        type: Schema.Types.Mixed
    },
    avatar: {
        type: String
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    facebook: {},
    twitter: {},
    github: {},
    google: {}
});

/**
 * Virtuals
 */
//UserSchema
//    .virtual('password')
//    .set(function(password) {
//        this._password = password;
////        this.hashedPassword = this.encryptPassword(password);
//    })
//    .get(function() {
//        return this._password;
//    });

// Public profile information
UserSchema
    .virtual('profile')
    .get(function() {
        return {
            'firstName': this.firstName,
            'role': this.role
        };
    });

// Non-sensitive info we'll be putting in the token
UserSchema
    .virtual('token')
    .get(function() {
        return {
            '_id': this._id,
            'firstName': this.firstName,
            'role': this.role
        };
    });

/**
 * Validations
 */

// Validate empty email
UserSchema
    .path('email')
    .validate(function(email) {
        // if you are authenticating by any of the oauth strategies, don't validate
        if (authTypes.indexOf(this.provider) !== -1) return true;
        return email.length;
    }, 'Email cannot be blank');

// Validate empty password
//UserSchema
//    .path('hashedPassword')
//    .validate(function(hashedPassword) {
//        // if you are authenticating by any of the oauth strategies, don't validate
//        if (authTypes.indexOf(this.provider) !== -1) return true;
//        return hashedPassword.length;
//    }, 'Password cannot be blank');

// Validate email is not taken
UserSchema
    .path('email')
    .validate(function(value, respond) {
        var self = this;
        this.constructor.findOne({email: value}, function(err, user) {
            if(err) throw err;
            if(user) {
                if(self.id === user.id) return respond(true);
                return respond(false);
            }
            respond(true);
        });
    }, 'The specified email address is already in use.');

var validatePresenceOf = function(value) {
    return value && value.length;
};

/**
 * Pre-save hook (execute before each user.save() call)
 */
UserSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // password changed so we need to hash it (generate a salt)
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // TODO (martin): is it good idea store salt?
        // store salt
//        this.salt = salt;

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

/**
 * Methods
 */
UserSchema.methods = {
    /**
     * Check if the passwords are the same
     *
     * @param {String} password
     * @return {Boolean}
     * @api public
     */
    comparePassword: function(password, cb) {
        bcrypt.compare(password, this.password, function(err, isMatch) {
            cb(err, isMatch);
        });
    }
};

module.exports = mongoose.model('User', UserSchema);
