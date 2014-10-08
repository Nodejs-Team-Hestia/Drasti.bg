var path = require('path');

var ROOT_PATH = path.normalize(__dirname + '../../'),
    PORT = 5000,
    DB_NAME = 'drastiDb';

module.exports = {
    development: {
        rootPath: ROOT_PATH,
        db: 'mongodb://localhost/' + DB_NAME,
        port: process.env.PORT || PORT
    },
    production: {
        rootPath: ROOT_PATH,
        db: '',
        port: process.env.PORT || PORT
    }
};