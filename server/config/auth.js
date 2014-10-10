'use strict';
var passport = require('passport');

function login(req, res, next) {
    var auth = passport.authenticate('local', function (err, user) {
        if (err) {
            return next(err);
        }
        if (!user) {
            res.send({ success: false });
        }

        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            res.send({ success: true, user: user });
        });
    });

    auth(req, res, next);
}
exports.login = login;

function logout(req, res, next) {
    req.logout();
    res.end();
}
exports.logout = logout;

function isAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        res.status(401);
        res.send("Not authorized for this content");
    } else {
        next();
    }
}
exports.isAuthenticated = isAuthenticated;

function isInRole(role) {
    return function (req, res, next) {
        if (req.isAuthenticated() && req.user.roles.indexOf(role) >= 0) {
            next();
        } else {
            res.status(401);
            res.send("Not authorized for this content");
        }
    };
}
exports.isInRole = isInRole;
//# sourceMappingURL=auth.js.map
