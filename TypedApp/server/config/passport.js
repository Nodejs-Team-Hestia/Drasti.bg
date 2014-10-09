'use strict';
var passport = require('passport');
var localPassport = require('passport-local');
var mongoose = require('mongoose');

var user = mongoose.model('User');

function init() {
    passport.use(new localPassport.Strategy(function (username, password, done) {
        user.findOne({ username: username }).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user && user.authenticate(password)) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        user.findOne({ _id: id }).exec(function (err, user) {
            if (err) {
                console.log('Error loading user: ' + err);
                return;
            }

            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    });
}
exports.init = init;
;
//# sourceMappingURL=passport.js.map
