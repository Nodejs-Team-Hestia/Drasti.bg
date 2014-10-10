'use strict';

import mongoose = require('mongoose');
import models = require('../models');

export interface IAlbumDocument extends IAlbum, mongoose.Document { }

export interface IAlbum {
	title: string;
	isPublic: boolean;
	photos: Array<models.photo.IPhotoDocument>;
}

export var Album: mongoose.Model<IAlbumDocument>;

export function init() {
	var albumSchema = new mongoose.Schema({
		title: { type: String, required: true },
		isPublic: false,
		photos: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }
		]
	});

	Album = mongoose.model<IAlbumDocument>('Album', albumSchema);
}


export function seedInitial(callback?: Function) {
	if (!process.env.NODE_ENV) {
		//Album.remove({}, function (err) {
		//	if (err) return console.log(err);
		//});
	}
}