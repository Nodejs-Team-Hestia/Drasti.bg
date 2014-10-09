'use strict';

import express = require('express');
import stylus = require('stylus');
import bodyParser = require('body-parser');
import cookieParser = require('cookie-parser');
import session = require('express-session');
import passport = require('passport');
import config = require('config');

export function init(app: express.Express, config: config.IConfig) {
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

	app.use(stylus.middleware(
		{
			src: config.rootPath + '/public',
			compile: (str, path) => stylus(str).set('filename', path)
		}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(express.static(config.rootPath + '/public'));
};