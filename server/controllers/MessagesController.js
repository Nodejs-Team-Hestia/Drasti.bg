var models = require('../models');

var Message = models.message.Message;
var User = models.user.User;

function createMessage(req, res) {
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
exports.createMessage = createMessage;

function getAllMessages(req, res) {
    Message.find({}).exec(function (err, results) {
        if (err) {
            console.log(err);
            return;
        }

        res.send(results);
    });
}
exports.getAllMessages = getAllMessages;

function getMessageById(req, res, next) {
    Message.find({ receiver: req.params.id }).populate('sender', 'username').exec(function (err, result) {
        if (err) {
            console.log('Messages could not be loaded: ' + err);
        }

        res.send(result);
    });
}
exports.getMessageById = getMessageById;

function updateMessage(req, res, next) {
    var messageToUpdate = req.body;

    Message.update({ _id: req.body.id }, messageToUpdate, function () {
        res.end();
    });
}
exports.updateMessage = updateMessage;

function deleteMessage(req, res, next) {
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
exports.deleteMessage = deleteMessage;
//# sourceMappingURL=messagesController.js.map
