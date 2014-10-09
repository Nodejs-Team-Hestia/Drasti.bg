var mongoose = require('mongoose');

var albumSchema = mongoose.Schema({
    title: {type: String, required: true},
    isPublic: false,
    photos: [
        {type: mongoose.Schema.ObjectId, ref: 'Photo'}
    ]
    // TODO: we may need more props
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;