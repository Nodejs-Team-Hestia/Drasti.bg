var mongoose = require('mongoose');
var photoSchema = mongoose.model('Photo').schema;

var albumSchema = mongoose.Schema({
    title: {type: String, required: true},
    photos: [photoSchema]
    // TODO: we may need more props
});

var Album = mongoose.model('Album', albumSchema);

module.exports = Album;