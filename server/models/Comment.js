'use strict';
var mongoose = require('mongoose');

exports.Comment;

function init() {
    var commentSchema = new mongoose.Schema({
        text: { type: String, required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        posted: { type: Date, default: new Date() }
    });

    exports.Comment = mongoose.model('Comment', commentSchema);
}
exports.init = init;

function seedInitial(callback) {
    if (!process.env.NODE_ENV) {
        //Comment.remove({}, function (err) {
        //	if (err) return console.log(err);
        //});
    }
}
exports.seedInitial = seedInitial;
//# sourceMappingURL=comment.js.map
