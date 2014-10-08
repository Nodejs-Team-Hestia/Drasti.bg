var path = require('path');

var ROOT_PATH = path.normalize(__dirname + '../../'),
    PORT = process.env.PORT || 5000,
    DB_NAME = 'drastiDb';

module.exports = {
    development: {
        rootPath: ROOT_PATH,
        db: 'mongodb://localhost/' + DB_NAME,
        port: PORT
    },
    production: {
        rootPath: ROOT_PATH,
        db: '',
        port: PORT
    }
};