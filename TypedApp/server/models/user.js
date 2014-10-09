'use strict';
var mongoose = require('mongoose');

var encryption = require('../utilities/encryption');

function addPassword(user) {
    // Password is the same as the username
    var salt = encryption.generateSalt();
    var hashedPwd = encryption.generateHashedPassword(salt, user.username);
    user.salt = salt;
    user.hashPass = hashedPwd;
}

exports.User;

function init() {
    var _this = this;
    var userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        firstName: { type: String },
        lastName: { type: String },
        dateOfBirth: Date,
        location: {
            city: String,
            country: String
        },
        isOnline: false,
        salt: String,
        hashPass: String,
        roles: [String],
        albums: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Album' }
        ],
        friends: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
        ],
        messages: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
        ]
    });

    userSchema.method({
        authenticate: function (password) {
            return encryption.generateHashedPassword(_this.salt, password) === _this.hashPass;
        }
    });

    exports.User = mongoose.model('User', userSchema);
}
exports.init = init;

function seedInitialUsers(callback) {
    if (!process.env.NODE_ENV) {
        exports.User.remove({}, function (err) {
            if (err)
                return console.log(err);

            var users = require('./users.json');
            users.forEach(function (userJson) {
                return addPassword(userJson);
            });

            exports.User.create(users, function (err) {
                if (err)
                    return console.log(err);

                console.log('Database seeded with users...');

                if (callback) {
                    callback();
                }
            });
        });
    }
}
exports.seedInitialUsers = seedInitialUsers;
//# sourceMappingURL=user.js.map
