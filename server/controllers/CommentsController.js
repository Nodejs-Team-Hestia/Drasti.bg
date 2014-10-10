var models = require('../models');

var Comment = models.comment.Comment;
var User = models.user.User;

function createComment(req, res) {
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
exports.createComment = createComment;

function getAll(req, res) {
    Comment.find({}).exec(function (err, results) {
        if (err) {
            console.log(err);
            return;
        }

        res.send(results);
    });
}
exports.getAll = getAll;

function updateComment(req, res, next) {
    var commentToUpdate = req.body;

    Comment.update({ _id: req.body.id }, commentToUpdate, function () {
        res.end();
    });
}
exports.updateComment = updateComment;

function getByReceiver(req, res) {
    Comment.find({ receiver: req.params.id }).populate('sender', 'username').exec(function (err, result) {
        if (err) {
            console.log('Comments could not be loaded: ' + err);
            return;
        }

        console.log(result);

        res.send(result);
    });
}
exports.getByReceiver = getByReceiver;
//# sourceMappingURL=commentsController.js.map
