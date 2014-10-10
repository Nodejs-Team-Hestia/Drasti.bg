import express = require('express');
import models = require('../models');

var Comment = models.comment.Comment;
var User = models.user.User;

export function createComment(req: express.Request, res: express.Response) {
	var now = new Date();

	var data = {
		text: req.body.text,
		date: now,
		sender: req.body.sender,
		receiver: req.body.receiver
	};

	var comment = new Comment(data);

	comment.save(function (err, success) {
		if (err) {
			res.send(err);
			return;
		}

		res.send(success);
	});
}

export function getAll(req: express.Request, res: express.Response) {
	Comment.find({}).exec(function (err, results) {
		if (err) {
			console.log(err);
			return;
		}

		res.send(results);
	});
}

export function updateComment(req: express.Request, res: express.Response, next) {
	var commentToUpdate = req.body;

	Comment.update({ _id: req.body.id }, commentToUpdate, function () {
		res.end();
	});
}

export function getByReceiver(req: express.Request, res: express.Response) {
	Comment.find({ receiver: req.params.id }).populate('sender', 'username').exec(function (err, result) {
		if (err) {
			console.log('Comments could not be loaded: ' + err);
			return;
		}

		console.log(result);

		res.send(result);
	});
}
