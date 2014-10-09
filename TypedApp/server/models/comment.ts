'use strict';

import mongoose = require('mongoose');
import models = require('../models');

export interface ICommentDocument extends IComment, mongoose.Document { }

export interface IComment {
	text: string;
	userId: mongoose.Types.ObjectId;
	posted: Date;
}

export var Comment: mongoose.Model<ICommentDocument>;

export function init() {
	var commentSchema = new mongoose.Schema({
		text: { type: String, required: true },
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		posted: { type: Date, default: new Date() }
	});

	Comment = mongoose.model<ICommentDocument>('Comment', commentSchema);
}


export function seedInitial(callback?: Function) {
	if (!process.env.NODE_ENV) {
		Comment.remove({}, function (err) {
			if (err) return console.log(err);
		});
	}
}