'use strict';

import express = require('express');
import models = require('../models');
var Album = models.album.Album;

export function createAlbum(req: express.Request, res: express.Response, next) {
	var newAlbum = req.body;
	Album.create(newAlbum, (err, album) => {
		if (err) {
			console.log('Failed to create album: ' + err);
			res.status(400);
			return;
		}

		res.send(album);
		res.end();
	})
	}

export function getAllAlbums(req: express.Request, res: express.Response, next) {
	Album.find({}).exec(function (err, collection) {
		if (err) {
			console.log('Albums could not be loaded: ' + err);
			res.status(400);
			return;
		}

		res.send(collection);
		res.end();
	})
	}

export function getAlbumById(req: express.Request, res: express.Response, next) {
	var albumId = req.body._id;
	Album.findOne({ _id: albumId }).exec((err, album) => {
		if (err) {
			console.log('Trying to get album did not work out: ' + err);
			return;
		}

		res.send(album);
		res.end();
	});
}

export function updateAlbum(req: express.Request, res: express.Response, next) {
	var newAlbumData = req.body;
	if (req.body._id && Album.findOne({ _id: req.body._id })) {
		Album.update({ _id: newAlbumData._id }, newAlbumData, (err, affectedRows, raw) => {
			res.end();
		});
	}
}

export function deleteAlbum(req: express.Request, res: express.Response, next) {
	var data = req.body;
	Album.remove({ _id: data._id }, (err) => {
		if (err) {
			console.log('Trying to remove album did not work out: ' + err);
		}

		res.end();
	});
}
