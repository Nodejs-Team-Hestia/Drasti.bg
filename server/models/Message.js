'use strict';
var mongoose = require('mongoose');

exports.Message;

function init() {
    var messagesSchema = new mongoose.Schema({
        content: { type: String, required: '{PATH} is required' },
        date: { type: Date, default: new Date() },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
    });

    exports.Message = mongoose.model('Message', messagesSchema);
}
exports.init = init;

function seedInitial(callback) {
    if (!process.env.NODE_ENV) {
        //Message.remove({}, function (err) {
        //	if (err) return console.log(err);
        //});
    }
}
exports.seedInitial = seedInitial;
//# sourceMappingURL=message.js.map
