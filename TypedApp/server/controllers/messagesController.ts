import express = require('express');
import models = require('../models');

var Message = models.message.Message;
var User = models.user.User;

export function createMessage(req: express.Request, res: express.Response) {
	var now = new Date();

	var data = {
		title: req.body.title,
		text: req.body.text,
		sent: now,
		sender: req.body.sender,
		receiver: req.body.receiver
	};

	var newItem = new Message(data);

	newItem.save(function (err, item) {
		if (err) {
			console.log('Failed to create new message: ' + err);
			return;
		}

		res.send('Message sent.');
	});
}

export function getAllMessages(req: express.Request, res: express.Response) {
	Message.find({}).exec(function (err, results) {
		if (err) {
			console.log(err);
			return;
		}

		res.send(results);
	});
}

export function getMessageById(req: express.Request, res: express.Response, next) {
	Message.find({ receiver: req.params.id }).populate('sender', 'username').exec(function (err, result) {
		if (err) {
			console.log('Messages could not be loaded: ' + err);
		}

		res.send(result);
	});
}

export function updateMessage(req: express.Request, res: express.Response, next) {
	var messageToUpdate = req.body;

	Message.update({ _id: req.body.id }, messageToUpdate, function () {
		res.end();
	});
}

export function deleteMessage(req: express.Request, res: express.Response, next) {
	Message.findById(req.body.messageId, function (err, message) {
		if (err) {
			console.log('Message could not be found ' + err);
			return;
		}

		message.remove(function (err) {
			if (err) {
				console.log('Message could not be removed ' + err);
				return;
			}

			res.send({
				success: true
			});
		});
	});
}