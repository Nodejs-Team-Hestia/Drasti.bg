var mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    text: {type: String, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: 'User'},
    posted: date : {type: Date, default: new Date()}
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;