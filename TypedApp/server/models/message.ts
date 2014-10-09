'use strict';

import mongoose = require('mongoose');
import models = require('../models');

export interface IMessageDocument extends IMessage, mongoose.Document { }

export interface IMessage {
	content?: string;
	date?: Date;
	sender?: mongoose.Types.ObjectId;
	receiver?: mongoose.Types.ObjectId;
}

export var Message: mongoose.Model<IMessageDocument>;

export function init() {
	var messagesSchema = new mongoose.Schema({
		content: { type: String, required: '{PATH} is required' },
		date: { type: Date, default: new Date() },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
	});

	Message = mongoose.model<IMessageDocument>('Message', messagesSchema);
}

export function seedInitial(callback?: Function) {
	if (!process.env.NODE_ENV) {
		Message.remove({}, function (err) {
			if (err) return console.log(err);
		});
	}
}