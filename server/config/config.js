'use strict';
var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var PORT = 1337;

exports.development = {
    rootPath: rootPath,
    db: 'mongodb://localhost/DrastiBg',
    port: process.env.PORT || PORT
};

exports.production = {
    rootPath: rootPath,
    //db: 'mongodb://******:*****@******.mongolab.com:*****/',
    port: process.env.PORT || PORT
};
//# sourceMappingURL=config.js.map
