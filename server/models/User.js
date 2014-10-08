var mongoose = require('mongoose');

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
    albums: [
        {type: mongoose.Schema.ObjectId, ref: 'Album'}
    ],
    friends: [
        {type: mongoose.Schema.ObjectId, ref: 'User'}
    ],
    salt: String,
    hashPassword: String
});

var User = mongoose.model('User', userSchema);

module.exports = User;