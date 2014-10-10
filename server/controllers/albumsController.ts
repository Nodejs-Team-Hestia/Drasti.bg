'use strict';

import express = require('express');
import models = require('../models');

var DEFAULT_PAGE_SIZE = 10;

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
	var page = Math.max(req.query.page, 1);
	var orderType = req.query.orderType === 'desc' ? '-' : '';
	var filter = req.query.filter || '';


	Album.find({})
		.where({ title: new RegExp(filter, "i") })
		.skip(DEFAULT_PAGE_SIZE * (page - 1))
		.limit(DEFAULT_PAGE_SIZE)
		.exec(function (error, collection) {
			if (error) {
				res.status(400);
				res.send(error);
			} else {
				res.send(collection);
			}
		});
}

export function getAlbumById(req: express.Request, res: express.Response, next) {
	var albumId = req.params.albumId;
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
	if (req.params.albumId && Album.findOne({ _id: req.params.albumId })) {
		Album.update({ _id: newAlbumData._id }, newAlbumData, (err, affectedRows, raw) => {
			res.end();
		});
	}
}

export function deleteAlbum(req: express.Request, res: express.Response, next) {
	Album.remove({ _id: req.params.albumId }, (err) => {
		if (err) {
			console.log('Trying to remove album did not work out: ' + err);
		}

		res.end();
	});
}
