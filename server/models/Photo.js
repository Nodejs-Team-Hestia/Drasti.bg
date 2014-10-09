var mongoose = require('mongoose');

var photoSchema = mongoose.Schema({
    title: {type: String, required: true},
    data: {type: String, required: true},
    Description: String,
    published: Date,
    isApproved: Boolean,
    viewsCount: Number,
    comments: [
        {type: mongoose.Schema.ObjectId, ref: 'Comment'}
    ]
    // TODO: image data, image url, tags ??
});

var Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;