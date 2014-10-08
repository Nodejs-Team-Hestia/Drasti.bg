var mongoose = require('mongoose');

module.exports = function (config) {
    mongoose.connect(config.db);
    var db = mongoose.connection;

    db.once('open', function (error) {
        if (error) {
            console.log('Database could not be opened: ' + error);
            return;
        }

        console.log('Database up and running...');
    });

    db.on('open', function (error) {
        console.log('Database error: ' + error);
    });
};