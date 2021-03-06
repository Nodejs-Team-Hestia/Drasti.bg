'use strict';
var encryption = require('../utilities/encryption');

var mongoose = require('mongoose');

var DEFAULT_PAGE_SIZE = 10;

var User = mongoose.model('User');

function createUser(req, res, next) {
    var newUserData = {
        username: req.body.username,
        email: req.body.email
    };

    newUserData.salt = encryption.generateSalt();
    newUserData.hashPass = encryption.generateHashedPassword(newUserData.salt, req.body.password);
    newUserData.roles = ['user'];

    User.create(newUserData, function (err, user) {
        if (err) {
            console.log('Failed to register new user: ' + err);
            res.status(400);
            res.send(false);
            return;
        }

        req.logIn(user, function (err) {
            if (err) {
                res.status(400);
                return res.send({ reason: err.toString() });
            }

            res.send(user);
        });
    });
}
exports.createUser = createUser;

function updateUser(req, res, next) {
    var updatedUserData = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        city: req.body.city,
        imageUrl: req.body.imageUrl
    };

    if (req.body.password && req.body.password.length > 5) {
        updatedUserData.salt = encryption.generateSalt();
        updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, req.body.password);
    }

    User.update({ _id: req.body._id }, updatedUserData, function (err, numberAffectedRows) {
        if (err) {
            res.status(400).send('Error updating user data: ' + err);
            return;
        }
        res.status(200).send('User updated successfully');
    });
}
exports.updateUser = updateUser;

function getAllUsers(req, res, next) {
    var page = Math.max(req.query.page, 1);
    var orderType = req.query.orderType === 'desc' ? '-' : '';
    var username = req.query.username || '';
    var firstName = req.query.firstName || '';
    var lastName = req.query.lastName || '';

    User.find({}).where({ username: new RegExp(username, "i") }).skip(DEFAULT_PAGE_SIZE * (page - 1)).limit(DEFAULT_PAGE_SIZE).select('_id username firstName lastName email').exec(function (error, users) {
        if (error) {
            res.status(400);
            res.send(error);
        } else {
            res.send(users);
        }
    });
}
exports.getAllUsers = getAllUsers;

function getById(req, res, next) {
    User.findOne({ _id: req.params.id }).select('_id username firstName lastName imageUrl city phone roles items').exec(function (err, user) {
        if (err) {
            res.status(400).send('User could not be found: ' + err);
            console.log('User could not be found: ' + err);
            return;
        }

        res.send(user);
    });
}
exports.getById = getById;

function deleteUser(req, res, next) {
    User.findOne({ _id: req.params.id }).remove().exec(function (err, user) {
        if (err) {
            res.status(400).send('User could not be found: ' + err);
            console.log('User could not be found: ' + err);
            return;
        }

        res.status(200).send("User deleted successfully from database" + user);
    });
}
exports.deleteUser = deleteUser;

function updateByAdmin(req, res, next) {
    var updatedUserData = {
        _id: req.body._id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone,
        city: req.body.city
    };

    if (req.body.password && req.body.password.length > 5) {
        updatedUserData.salt = encryption.generateSalt();
        updatedUserData.hashPass = encryption.generateHashedPassword(updatedUserData.salt, req.body.password);
    }

    User.update({ _id: req.body._id }, updatedUserData, function (err, numberAffectedRows) {
        if (err) {
            res.status(400).send('Error updating user data: ' + err);
            return;
        }
        res.status(200).send('User updated successfully');
    });
}
exports.updateByAdmin = updateByAdmin;
//# sourceMappingURL=usersController.js.map
