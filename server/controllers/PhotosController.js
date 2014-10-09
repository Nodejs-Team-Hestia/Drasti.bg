var Photo = require('mongoose').model('Photo');

module.exports = {
    uploadPhoto: function (req, res, next) {
        // TODO: upload photo in album by albumId
    },
    getAllPhotos: function (req, res, next) {
        //  TODO: get all photos in album by albumId
    },
    getPhotoById: function (req, res, next) {
        Photo.findOne({_id: req.params.id})
            .select('-data')
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be loaded: ' + err);
                    return;
                }

                res.send(photo);
            });
    },
    deletePhoto: function (req, res, next) {
        // console.log(req.params.id);
        Photo.findOne({_id: req.params.id})
            .exec(function (err, photo) {
                if (err) {
                    console.log('Photo could not be found: ' + err);
                    return;
                }

                photo.remove(function (err) {
                    if (err) {
                        console.log('Photo could not be removed: ' + err);
                    }
                });

                res.send({message: 'Photo deleted successfully!'});
            })
    },
    updatePhoto: function (req, res, next) {
        if (req.params.id) {
            Photo.findOne({_id: req.params.id})
                .exec(function (err, photo) {
                    if (err) {
                        console.log('Photo could not be updated: ' + err);
                        return;
                    }

                    if (req.query && req.query.isApproved) {
                        photo.isApproved = true;
                        photo.save();
                    }

                    res.send({message: 'Photo updated successfully!'})
                })
        }
    }
};