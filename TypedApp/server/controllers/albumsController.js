'use strict';
var models = require('../models');
var Album = models.album.Album;

function createAlbum(req, res, next) {
    var newAlbum = req.body;
    Album.create(newAlbum, function (err, album) {
        if (err) {
            console.log('Failed to create album: ' + err);
            res.status(400);
            return;
        }

        res.send(album);
        res.end();
    });
}
exports.createAlbum = createAlbum;

function getAllAlbums(req, res, next) {
    Album.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Albums could not be loaded: ' + err);
            res.status(400);
            return;
        }

        res.send(collection);
        res.end();
    });
}
exports.getAllAlbums = getAllAlbums;

function getAlbumById(req, res, next) {
    var albumId = req.body._id;
    Album.findOne({ _id: albumId }).exec(function (err, album) {
        if (err) {
            console.log('Trying to get album did not work out: ' + err);
            return;
        }

        res.send(album);
        res.end();
    });
}
exports.getAlbumById = getAlbumById;

function updateAlbum(req, res, next) {
    var newAlbumData = req.body;
    if (req.body._id && Album.findOne({ _id: req.body._id })) {
        Album.update({ _id: newAlbumData._id }, newAlbumData, function (err, affectedRows, raw) {
            res.end();
        });
    }
}
exports.updateAlbum = updateAlbum;

function deleteAlbum(req, res, next) {
    var data = req.body;
    Album.remove({ _id: data._id }, function (err) {
        if (err) {
            console.log('Trying to remove album did not work out: ' + err);
        }

        res.end();
    });
}
exports.deleteAlbum = deleteAlbum;
//# sourceMappingURL=albumsController.js.map
