'use strict';

import mongoose = require('mongoose');
import models = require('../models');

export interface IPhotoDocument extends IPhoto, mongoose.Document { }

export interface IPhoto {
	title: string;
	data: string;
	Description: string;
	published: Date;
	isApproved: boolean;
	viewsCount: number;
	comments: Array<mongoose.Types.ObjectId>;
	imageData: string;
}

export var Photo: mongoose.Model<IPhotoDocument>;

export function init() {
	var photoSchema = new mongoose.Schema({
		title: { type: String, required: true },
		data: { type: String, required: true },
		Description: String,
		published: { type: Date, default: new Date() },
		isApproved: Boolean,
		viewsCount: Number,
		album: { type: mongoose.Schema.Types.ObjectId, ref: 'Album' },
		comments: [
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
		],
		imageData: String
	});

	Photo = mongoose.model<IPhotoDocument>('Photo', photoSchema);
}


export function seedInitialPhotos(callback?: Function) {
	if (!process.env.NODE_ENV) {
		//Photo.remove({}, function (err) {
		//	if (err) return console.log(err);
		//});
	}
}