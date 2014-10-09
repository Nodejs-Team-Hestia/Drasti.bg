'use strict';
var mongoose = require('mongoose');

var Photo = mongoose.model('Photo');

function uploadPhoto(req, res, next) {
    // TODO: upload photo in album by albumId
}
exports.uploadPhoto = uploadPhoto;

function getAllPhotos(req, res, next) {
    //  TODO: get all photos in album by albumId
}
exports.getAllPhotos = getAllPhotos;

function getPhotoById(req, res, next) {
    Photo.findOne({ _id: req.params.id }).select('-data').exec(function (err, photo) {
        if (err) {
            console.log('Photo could not be loaded: ' + err);
            return;
        }

        res.send(photo);
    });
}
exports.getPhotoById = getPhotoById;

function deletePhoto(req, res, next) {
    // console.log(req.params.id);
    Photo.findOne({ _id: req.params.id }).exec(function (err, photo) {
        if (err) {
            console.log('Photo could not be found: ' + err);
            return;
        }

        photo.remove(function (err) {
            if (err) {
                console.log('Photo could not be removed: ' + err);
            }
        });

        res.send({ message: 'Photo deleted successfully!' });
    });
}
exports.deletePhoto = deletePhoto;

function updatePhoto(req, res, next) {
    if (req.params.id) {
        Photo.findOne({ _id: req.params.id }).exec(function (err, photo) {
            if (err) {
                console.log('Photo could not be updated: ' + err);
                return;
            }

            if (req.query && req.query.isApproved) {
                photo.isApproved = true;
                photo.save();
            }

            res.send({ message: 'Photo updated successfully!' });
        });
    }
}
exports.updatePhoto = updatePhoto;
//# sourceMappingURL=photosController.js.map
