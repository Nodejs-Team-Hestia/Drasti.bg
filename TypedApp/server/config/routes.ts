'use strict';
import express = require('express');

import auth = require('./auth');
import controllers = require('../controllers');

export function init(app: express.Express) {
	// Users
	app.route('/api/users')
		.get(controllers.users.getAllUsers)
		.post(controllers.users.createUser)
		.put(auth.isAuthenticated, controllers.users.updateUser);

	app.route('/api/users/:id')
		.get(controllers.users.getById)
		.post(auth.isInRole('admin'), controllers.users.updateByAdmin)
		.delete(auth.isInRole('admin'), controllers.users.deleteUser);
	//.put(auth.isAuthenticated(), controllers.users.voteForUser)

	app.post('/login', auth.login);
	app.post('/logout', auth.logout);

	// Photos
	app.post('/:userId/:albumId', controllers.photos.uploadPhoto);
	app.route('/:userId/:albumId/:id')
		.get(controllers.photos.getPhotoById)
		.put(auth.isInRole('user'), controllers.photos.updatePhoto)
		.delete(auth.isInRole('user'), controllers.photos.deletePhoto);

	// Albums
	app.get('/:userId/albums/:id', controllers.albums.getAlbumById);
	app.route('/:userId/albums')
		.get(controllers.albums.getAllAlbums)
		.post(controllers.albums.createAlbum)
		.put(controllers.albums.updateAlbum)
		.delete(controllers.albums.deleteAlbum);

	app.get('/api/*', (req, res) => {
		res.render('index');
		res.status(404);
		res.end();
	});

	app.get('*', (req, res) => {
		res.render('index', { currentUser: req.user });
	});
};