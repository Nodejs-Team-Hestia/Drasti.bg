var path = require('path');
var ROOT_PATH = path.normalize(__dirname + '../../');

module.exports = {
    development: {
        rootPath: ROOT_PATH,
        db: 'mongodb://localhost/drastiDb',
        port: process.env.PORT || 5000
    },
    production: {
        rootPath: ROOT_PATH,
        db: '',
        port: process.env.PORT || 5000
    }
};