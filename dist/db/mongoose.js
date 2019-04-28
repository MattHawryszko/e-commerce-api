"use strict";

var mongoose = require('mongoose');

var dbName = "e-commerce";
var dbUser = "admin";
var dbPassword = "abc123";
var dbServer = "127.0.0.1";
var dbPort = "27017";
var dbAuthSource = "admin";

var dbConnectionString = "mongodb://" + dbUser + ":" + dbPassword + "@" + dbServer + ":" + dbPort + "/" + dbName + "?authSource=" + dbAuthSource;

mongoose.connect(dbConnectionString, {
    "useNewUrlParser": true,
    "useCreateIndex": true
});
//# sourceMappingURL=mongoose.js.map