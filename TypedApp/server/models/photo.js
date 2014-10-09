'use strict';
var mongoose = require('mongoose');

exports.Photo;

function init() {
    var photoSchema = new mongoose.Schema({
        title: { type: String, required: true },
        data: { type: String, required: true },
        Description: String,
        published: { type: Date, default: new Date() },
        isApproved: Boolean,
        viewsCount: Number,
        comments: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }
        ],
        imageData: String
    });

    exports.Photo = mongoose.model('Photo', photoSchema);
}
exports.init = init;

function seedInitialPhotos(callback) {
    if (!process.env.NODE_ENV) {
        exports.Photo.remove({}, function (err) {
            if (err)
                return console.log(err);
        });
    }
}
exports.seedInitialPhotos = seedInitialPhotos;
//# sourceMappingURL=photo.js.map
