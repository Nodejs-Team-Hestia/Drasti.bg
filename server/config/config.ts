'use strict';

import path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
var PORT = 1337;

export var development = {
	rootPath: rootPath,
	db: 'mongodb://localhost/DrastiBg',
	port: process.env.PORT || PORT
};

export var production = {
	rootPath: rootPath,
	//db: 'mongodb://******:*****@******.mongolab.com:*****/',
	port: process.env.PORT || PORT
};

export interface IConfig {
	rootPath: string;
	db: string;
	port: number;
}