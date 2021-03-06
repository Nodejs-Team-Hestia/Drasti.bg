﻿import express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var http = require('http').Server(app);
import config = require('./server/config/config');
var envConfig: config.IConfig = config[env];

import expressConfig = require('./server/config/express');
expressConfig.init(app, envConfig);

import mongooseConfig = require('./server/config/mongoose');
mongooseConfig.init(envConfig);

import passportConfig = require('./server/config/passport');
passportConfig.init();

import routesConfig = require('./server/config/routes');
routesConfig.init(app);

import socketIO = require('socket.io');
var socketManager = socketIO.listen(http);

socketManager.on('connection', function (socket: socketIO.Socket) {
	setInterval(() => {
		socket.emit("time", new Date().getTime());
	}, 1000);
});

http.listen(envConfig.port);

console.log("Current environment = " + env);
console.log("Server running on port: " + envConfig.port);