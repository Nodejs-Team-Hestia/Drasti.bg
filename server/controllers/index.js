var UsersController = require('../controllers/UsersController'),
    PhotosController = require('../controllers/PhotosController'),
    AlbumsController = require('../controllers/AlbumsController');

module.exports = {
    users: UsersController,
    photos: PhotosController,
    albums: AlbumsController
};