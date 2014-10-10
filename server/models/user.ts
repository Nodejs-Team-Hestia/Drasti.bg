'use strict';

import mongoose = require('mongoose');
import models = require('../models');
import encryption = require('../utilities/encryption');

function addPassword(user: IUser) {
	// Password is the same as the username
	var salt = encryption.generateSalt();
	var hashedPwd = encryption.generateHashedPassword(salt, user.username);
	user.salt = salt;
	user.hashPass = hashedPwd;
}

export interface IUserDocument extends IUser, mongoose.Document { }

export interface IUser {
	username?: string;
	email?: string;
	firstName?: string;
	lastName?: string;
	dateOfBirth?: Date;
	location?: {
		city?: string;
		country?: string;
	};
	isOnline?: boolean;
	salt?: string;
	hashPass?: string;
	roles?: Array<string>;
	albums?: Array<models.album.IAlbumDocument>;
	friends?: Array<models.user.IUserDocument>;
	messages?: Array<models.message.IMessageDocument>;
	authenticate?: (password: string) => boolean;
}

export var User: mongoose.Model<IUserDocument>;

export function init() {
	var userSchema = new mongoose.Schema({
		username: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		firstName: { type: String },
		lastName: { type: String },
		dateOfBirth: Date,
		location: {
			city: String,
			country: String
		},
		isOnline: false,
		salt: String,
		hashPass: String,
		roles: [String],
		albums: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
		],
		friends: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }
		],
		messages: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
		]
	});

	userSchema.method({
		authenticate: function (password) {
			return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
		}
	});

	User = mongoose.model<IUserDocument>('User', userSchema);
}


export function seedInitialUsers(callback?: Function) {
	if (!process.env.NODE_ENV) {
		User.remove({}, function (err) {
			if (err) return console.log(err);

			var users = require('./users.json');
			users.forEach((userJson: IUser) => addPassword(userJson));

			User.create(users, function (err) {
				if (err) return console.log(err);

				console.log('Database seeded with users...');

				if (callback) {
					callback();
				}
			});
		});
	}
}