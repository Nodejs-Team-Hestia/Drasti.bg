var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    firstName: {type: String},
    lastName: {type: String},
    dateOfBirth: Date,
    location: {
        city: String,
        country: String
    },
    salt: String,
    hashPass: String,
    roles: [String],
    albums: [
        {type: mongoose.Schema.ObjectId, ref: 'Album'}
    ],
    friends: [
        {type: mongoose.Schema.ObjectId, ref: 'User'}
    ],
    messages: [
        {type: mongoose.Schema.ObjectId, ref: 'Message'}
    ]
});

var User = mongoose.model('User', userSchema);

module.exports = User;

module.exports.seedInitialUsers = function () {
    User.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Cannot find users ' + err);
        }
        if (collection.length === 0) {
            var salt,
                hashedPassword;

            salt = encryption.generateSalt();
            hashedPassword = encryption.generateHashedPassword(salt, 'Anastasoff');
            User.create({username: 'Anastasoff', firstName: 'Martin', lastName: 'Anastasov', email: 'Anastasoff@drasti.bg', salt: salt, hashPass: hashedPassword, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPassword = encryption.generateHashedPassword(salt, 'SPopgeorgiev');
            User.create({username: 'SPopgeorgiev', firstName: 'Stefan', lastName: 'Popgeorgiev', email: 'SPopgeorgiev@drasti.bg', salt: salt, hashPass: hashedPassword, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPassword = encryption.generateHashedPassword(salt, 'ventsislav-georgiev');
            User.create({username: 'ventsislav-georgiev', firstName: 'Ventsislav', lastName: 'Georgiev', email: 'ventsislav-georgiev@drasti.bg', salt: salt, hashPass: hashedPassword, roles: ['admin']});

            salt = encryption.generateSalt();
            hashedPassword = encryption.generateHashedPassword(salt, 'kulin1987');
            User.create({username: 'kulin1987', firstName: 'Ventsislav', lastName: 'Kulin', email: 'kulin1987@drasti.bg', salt: salt, hashPass: hashedPassword, roles: ['admin']});

            console.log('users added to database');
        }
    });
};