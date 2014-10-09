var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('index');
    });

    app.get('/api/users', auth.isInRole('admin'), controllers.users.getAllUsers);
    app.get('/api/users/:id', controllers.users.getUserById);
    app.post('/api/users', controllers.users.createUser);
    app.put('/api/users', auth.isAuthenticated, controllers.users.updateUser);
    app.post('/login', auth.login);
    app.post('/logout', auth.logout);
    app.get('/api/*', function (req, res) {
        res.status(404);
        res.end();
    });
    app.get('*', function (req, res) {
        res.render('index', {currentUser: req.user});
    });
};