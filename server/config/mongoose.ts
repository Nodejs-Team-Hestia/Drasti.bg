'use strict';

import mongoose = require('mongoose');
import models = require('../models');

//function addOwnersToItems() {
//	mongoose.model<models.item.IItemDocument>('Item').find({}, (err, items) => {
//		console.log('There are ' + items.length + ' items.');
//		mongoose.model<models.user.IUserDocument>('User').find({ roles: { $ne: 'admin' } }, (err, users) => {

//			console.log('There are ' + users.length + ' users.');
//			items.forEach((item) => {
//				var i = Math.floor(Math.random() * users.length);
//				var randomUser = users[i];
//				item.owner = randomUser._id;
//				item.save();
//				console.log(randomUser.username + ' has ' + item.title);
//			});
//		});
//	});
//}

export function init(config) {
	mongoose.connect(config.db);
	var db = mongoose.connection;

	db.once('open', function (err) {
		if (err) {
			console.log('Database could not be opened: ' + err);
			return;
		}

		console.log('Database up and running...');
	});

	db.on('error', function (err) {
		console.log('Database error: ' + err);
	});

	models.photo.init();
	models.album.init();
	models.comment.init();
	models.message.init();
	models.user.init();

	models.user.seedInitialUsers(function (err) {
		if (err) {
			console.log(err);
		}
	});
}