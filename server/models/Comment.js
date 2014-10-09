var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: {type: String, required: true},    
    posted: date : {type: Date, default: new Date()},
	sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
	receiver: {type: mongoose.Schema.ObjectId, ref: 'User'}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;