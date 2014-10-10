'use strict';
var mongoose = require('mongoose');

exports.Album;

function init() {
    var albumSchema = new mongoose.Schema({
        title: { type: String, required: true },
        isPublic: false,
        photos: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Photo' }
        ]
    });

    exports.Album = mongoose.model('Album', albumSchema);
}
exports.init = init;

function seedInitial(callback) {
    if (!process.env.NODE_ENV) {
        //Album.remove({}, function (err) {
        //	if (err) return console.log(err);
        //});
    }
}
exports.seedInitial = seedInitial;
//# sourceMappingURL=album.js.map
