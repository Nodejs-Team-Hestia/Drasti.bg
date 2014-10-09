'use strict';
var express = require('express');
var stylus = require('stylus');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

function init(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
        secret: 'team-hestia',
        name: 'session',
        proxy: true,
        resave: true,
        saveUninitialized: true
    }));

    app.use(stylus.middleware({
        src: config.rootPath + '/public',
        compile: function (str, path) {
            return stylus(str).set('filename', path);
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
}
exports.init = init;
;
//# sourceMappingURL=express.js.map
