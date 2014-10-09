var auth = require('./auth'),
    controllers = require('../controllers'),
    PHOTO_PATH = '/:userId/:albumId';

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.render('index');
    });

    // user
    app.get('/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.get('/users/:id', controllers.users.getUserById);
    app.post('/users', controllers.users.createUser);
    app.put('/users', auth.isAuthenticated, controllers.users.updateUser);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    // photo
    app.post(PHOTO_PATH, controllers.photos.uploadPhoto);
    app.get(PHOTO_PATH + '/:id', controllers.photos.getPhotoById);
    app.put(PHOTO_PATH + '/:id', auth.isInRole('user'), controllers.photos.updatePhoto);
    app.delete(PHOTO_PATH + '/:id', auth.isInRole('user'), controllers.photos.deletePhoto);

    app.get('*', function (req, res) {
        res.redirect('/');
    });
};