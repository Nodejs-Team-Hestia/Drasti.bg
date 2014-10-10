'use strict';
var models = require('../models');

var DEFAULT_PAGE_SIZE = 10;

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
    var page = Math.max(req.query.page, 1);
    var orderType = req.query.orderType === 'desc' ? '-' : '';
    var filter = req.query.filter || '';

    Album.find({}).where({ title: new RegExp(filter, "i") }).skip(DEFAULT_PAGE_SIZE * (page - 1)).limit(DEFAULT_PAGE_SIZE).exec(function (error, collection) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.send(collection);
        }
    });
}
exports.getAllAlbums = getAllAlbums;

function getAlbumById(req, res, next) {
    var albumId = req.params.albumId;
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
    if (req.params.albumId && Album.findOne({ _id: req.params.albumId })) {
        Album.update({ _id: newAlbumData._id }, newAlbumData, function (err, affectedRows, raw) {
            res.end();
        });
    }
}
exports.updateAlbum = updateAlbum;

function deleteAlbum(req, res, next) {
    Album.remove({ _id: req.params.albumId }, function (err) {
        if (err) {
            console.log('Trying to remove album did not work out: ' + err);
        }

        res.end();
    });
}
exports.deleteAlbum = deleteAlbum;
//# sourceMappingURL=albumsController.js.map
