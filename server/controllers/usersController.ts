'use strict';

import fs = require("fs");
import encryption = require('../utilities/encryption');
import express = require('express');
import mongoose = require('mongoose');
import models = require('../models');

var DEFAULT_PAGE_SIZE = 10;

var User = mongoose.model<models.user.IUserDocument>('User');

export function createUser(req: express.Request, res: express.Response, next) {
	var newUserData: models.user.IUser = {
		username: req.body.username,
		email: req.body.email
	};

	newUserData.salt = encryption.generateSalt();
	newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
	newUserData.roles = ['user'];

	User.create(newUserData, (err, user) => {
		if (err) {
			console.log('Failed to register new user: ' + err);
			res.status(400);
			res.send(false);
			return;
		}

		req.logIn(user, function (err) {
			if (err) {
				res.status(400);
				return res.send({ reason: err.toString() });
			}

			res.send(user);
		});
	});
}

export function updateUser(req: express.Request, res: express.Response, next) {
	var updatedUserData: models.user.IUser = {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		city: req.body.city,
		imageUrl: req.body.imageUrl
	};

	if (req.body.password && req.body.password.length > 5) {
		updatedUserData.salt = encryption.generateSalt();
		updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, req.body.password);
	}

	User.update({ _id: req.body._id }, updatedUserData, function (err, numberAffectedRows) {
		if (err) {
			res.status(400).send('Error updating user data: ' + err);
			return;
		}
		res.status(200).send('User updated successfully');
	});
}

export function getAllUsers(req: express.Request, res: express.Response, next) {
	var page = Math.max(req.query.page, 1);
	var orderType = req.query.orderType === 'desc' ? '-' : '';
	var username = req.query.username || '';
	var firstName = req.query.firstName || '';
	var lastName = req.query.lastName || '';


	User.find({})
		.where({ username: new RegExp(username, "i") })
		//.where({ firstName: new RegExp(firstName, "i") })
		//.where({ lastName: new RegExp(lastName, "i") })
		.skip(DEFAULT_PAGE_SIZE * (page - 1))
		.limit(DEFAULT_PAGE_SIZE)
		//.sort(orderType + 'rank')
		.select('_id username firstName lastName email') //city phone roles items
		.exec(function (error, users) {
			if (error) {
				res.status(400);
				res.send(error);
			} else {
				res.send(users);
			}
		});
}

export function getById(req: express.Request, res: express.Response, next) {
	User
		.findOne({ _id: req.params.id })
		.select('_id username firstName lastName imageUrl city phone roles items')
		.exec(function (err, user) {
			if (err) {
				res.status(400).send('User could not be found: ' + err);
				console.log('User could not be found: ' + err);
				return;
			}

			res.send(user);
		});
}

export function deleteUser(req: express.Request, res: express.Response, next) {
	User
		.findOne({ _id: req.params.id })
		.remove()
		.exec((err, user) => {
			if (err) {
				res.status(400).send('User could not be found: ' + err);
				console.log('User could not be found: ' + err);
				return;
			}

			res.status(200).send("User deleted successfully from database" + user);
		});
}

export function updateByAdmin(req: express.Request, res: express.Response, next) {
	var updatedUserData: models.user.IUser = {
		_id: req.body._id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		phone: req.body.phone,
		city: req.body.city
	};

	if (req.body.password && req.body.password.length > 5) {
		updatedUserData.salt = encryption.generateSalt();
		updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, req.body.password);
	}

	User.update({ _id: req.body._id }, updatedUserData, (err, numberAffectedRows) => {
		if (err) {
			res.status(400).send('Error updating user data: ' + err);
			return;
		}
		res.status(200).send('User updated successfully');
	});
}