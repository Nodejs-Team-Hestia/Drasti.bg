'use strict';

import passport = require('passport');
import localPassport = require('passport-local');
import mongoose = require('mongoose');
import models = require('../models');

var user = mongoose.model<models.user.IUserDocument>('User');

export function init() {
	passport.use(new localPassport.Strategy((username, password, done) => {
		user.findOne({ username: username }).exec((err, user) => {
			if (err) {
				console.log('Error loading user: ' + err);
				return;
			}

			if (user && user.authenticate(password)) {
				return done(null, user);
			}
			else {
				return done("Username or password is not valid");
			}
		});
	}));

	passport.serializeUser((user, done) => {
		if (user) {
			return done(null, user._id);
		}
	});

	passport.deserializeUser((id, done) => {
		user.findOne({ _id: id }).exec((err, user) => {
			if (err) {
				console.log('Error loading user: ' + err);
				return;
			}

			if (user) {
				return done(null, user);
			}
			else {
				return done(null, false);
			}
		});
	});
};