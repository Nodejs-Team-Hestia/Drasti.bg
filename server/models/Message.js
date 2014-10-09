var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
	title: {type: String, required: true},
    text: {type: String, required: true},
    sender: {type: mongoose.Schema.ObjectId, ref: 'User'},
	receiver: {type: mongoose.Schema.ObjectId, ref: 'User'},
    sent: {type: Date, default: new Date()}
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;