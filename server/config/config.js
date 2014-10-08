var path = require('path');
var ROOT_PATH = path.normalize(__dirname + '../../');
var PORT = 5000;

module.exports = {
    development: {
        rootPath: ROOT_PATH,
        db: 'mongodb://localhost/drastiDb',
        port: process.env.PORT || PORT
    },
    production: {
        rootPath: ROOT_PATH,
        db: '',
        port: process.env.PORT || PORT
    }
};