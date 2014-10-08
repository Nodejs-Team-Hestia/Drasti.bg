var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    text: {type: String, required: true},
    from: {type: mongoose.Schema.ObjectId, ref: 'User'},
    sent: Date
});

var Message = mongoose.model('Message', messageSchema);

module.exports = Message;