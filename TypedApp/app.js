var express = require('express');

var env = process.env.NODE_ENV || 'development';

var app = express();
var config = require('./server/config/config');
var envConfig = config[env];

var expressConfig = require('./server/config/express');
expressConfig.init(app, envConfig);

var mongooseConfig = require('./server/config/mongoose');
mongooseConfig.init(envConfig);

var passportConfig = require('./server/config/passport');
passportConfig.init();

var routesConfig = require('./server/config/routes');
routesConfig.init(app);

app.listen(envConfig.port);

console.log("Current environment = " + env);
console.log("Server running on port: " + envConfig.port);
//# sourceMappingURL=app.js.map
