var Message = require('mongoose').model('Message');
var User = require('mongoose').model('User');

module.exports = {
    createMessage: function (req, res) {
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
    },
    getAllMessages: function (req, res) {
		Message.find({}).exec(function(err, results){
            if(err) {
                console.log(err);
                return;
            }

            res.send(results)
        })
    },
    getMessageById: function (req, res, next) {
		Message.find({receiver: req.params.id}).populate('sender', 'username').exec(function (err, result) {
            if (err) {
                console.log('Messages could not be loaded: ' + err);
            }

            res.send(result);
        })
    },
    updateMessage: function (req, res, next) {
		//TODO
    },
    deleteMessage: function (req, res, next) {
		//TODO
    }
};