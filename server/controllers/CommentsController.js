var Comment = require('mongoose').model('Comment');
var User = require('mongoose').model('User');

module.exports = {
    createComment : function(req, res){
		var now = new Date();
		
			var data = {
				text: req.body.text,
				date: now,
				sender: req.body.sender,
				receiver: req.body.receiver
			};

			var comment = new Comment(data);

			comment.save(function(err, success){
				if(err) {
					res.send(err);
					return;
				}

				res.send(success);
			});
		},
    getAll: function(req, res){
        Comment.find({}).exec(function(err, results){
            if(err) {
                console.log(err);
                return;
            }

            res.send(results)
        })
    },
    updateComment: function (req, res, next) {
        var commentToUpdate = req.body;

        Message.update({ _id: req.body.id }, commentToUpdate, function () {
            res.end();
        })
    },
    getByReceiver: function(req, res){
        Comment.find({receiver: req.params.id}).populate('sender', 'username').exec(function(err, result) {
            if (err) {
                console.log('Comments could not be loaded: ' + err);
                return;
            }

            console.log(result);

            res.send(result);
        })
    }
};