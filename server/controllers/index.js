var UsersController = require('../controllers/UsersController'),
    PhotosController = require('../controllers/PhotosController'),
    AlbumsController = require('../controllers/AlbumsController'),
    MessagesController = require('../controllers/MessagesController');

module.exports = {
    users: UsersController,
    photos: PhotosController,
    albums: AlbumsController,
    messages: MessagesController
};