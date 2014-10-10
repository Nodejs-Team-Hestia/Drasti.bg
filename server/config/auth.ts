'use strict';

import passport = require('passport');
import express = require('express');

export function login(req: express.Request, res: express.Response, next) {
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

export function logout(req: express.Request, res: express.Response, next) {
	req.logout();
	res.end();
}

export function isAuthenticated(req: express.Request, res: express.Response, next) {
	if (!req.isAuthenticated()) {
		res.status(401);
		res.send("Not authorized for this content");
	}
	else {
		next();
	}
}

export function isInRole(role: string) {
	return function (req: express.Request, res: express.Response, next) {
		if (req.isAuthenticated() && req.user.roles.indexOf(role) >= 0) {
			next();
		}
		else {
			res.status(401);
			res.send("Not authorized for this content");
		}
	};
}