'use strict';

import express = require('express');
import mongoose = require('mongoose');
import models = require('../models');

var Photo = mongoose.model<models.photo.IPhotoDocument>('Photo');

export function uploadPhoto(req: express.Request, res: express.Response, next) {
	// TODO: upload photo in album by albumId
}

export function getAllPhotos(req: express.Request, res: express.Response, next) {
	//  TODO: get all photos in album by albumId
}

export function getPhotoById(req: express.Request, res: express.Response, next) {
	Photo.findOne({ _id: req.params.id })
		.select('-data')
		.exec(function (err, photo) {
			if (err) {
				console.log('Photo could not be loaded: ' + err);
				return;
			}

			res.send(photo);
		});
}

export function deletePhoto(req: express.Request, res: express.Response, next) {
	// console.log(req.params.id);
	Photo.findOne({ _id: req.params.id })
		.exec(function (err, photo) {
			if (err) {
				console.log('Photo could not be found: ' + err);
				return;
			}

			photo.remove(function (err) {
				if (err) {
					console.log('Photo could not be removed: ' + err);
				}
			});

			res.send({ message: 'Photo deleted successfully!' });
		});
}

export function updatePhoto(req: express.Request, res: express.Response, next) {
	if (req.params.id) {
		Photo.findOne({ _id: req.params.id })
			.exec(function (err, photo) {
				if (err) {
					console.log('Photo could not be updated: ' + err);
					return;
				}

				if (req.query && req.query.isApproved) {
					photo.isApproved = true;
					photo.save();
				}

				res.send({ message: 'Photo updated successfully!' });
			});
	}
}