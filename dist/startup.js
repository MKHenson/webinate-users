"use strict";
var http = require("http");
var https = require("https");
var fs = require("fs");
var express = require("express");
var morgan = require("morgan");
var methodOverride = require("method-override");
var winston = require("winston");
var bucket_controller_1 = require("./controllers/bucket-controller");
var user_controller_1 = require("./controllers/user-controller");
var cors_controller_1 = require("./controllers/cors-controller");
var comms_controller_1 = require("./controllers/comms-controller");
var error_controller_1 = require("./controllers/error-controller");
var yargs = require("yargs");
var mongodb = require("mongodb");
var args = yargs.argv;
winston.addColors({ debug: 'green', info: 'cyan', silly: 'magenta', warn: 'yellow', error: 'red' });
winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, { level: 'debug', colorize: true });
// Saves logs to file
if (args.logFile && args.logFile.trim() != "")
    winston.add(winston.transports.File, { filename: args.logFile, maxsize: 50000000, maxFiles: 1, tailable: true });
// If no logging - remove all transports
if (args.logging && args.logging.toLowerCase().trim() == "false") {
    winston.remove(winston.transports.File);
    winston.remove(winston.transports.Console);
}
// Create the express app
var app = express();
// Make sure the argument is there
if (!args.config || args.config.trim() == "") {
    winston.error("Error! No config file specified. Please start Users with the config file in the command line. Eg: node users.js --config=\"./config.js\"", { process: process.pid });
    process.exit();
}
// Make sure the file exists
if (!fs.existsSync(args.config)) {
    winston.error("Could not locate the config file at '" + args.config + "'", { process: process.pid });
    process.exit();
}
// Load the file
var jsonConfig = fs.readFileSync(args.config, "utf8");
try {
    // Parse the config
    console.log("Parsing file config...");
    var config = JSON.parse(jsonConfig);
}
catch (exp) {
    winston.error("There was an error parsing the config file '" + exp.toString() + "'", { process: process.pid }, function () {
        process.exit();
    });
}
winston.info("Opening the database...", { process: process.pid });
openDB(config).then(function (db) {
    winston.info("Initializing controllers...", { process: process.pid });
    return Promise.all([
        new comms_controller_1.CommsController(config).initialize(db),
        new cors_controller_1.CORSController(app, config).initialize(db),
        new bucket_controller_1.BucketController(app, config).initialize(db),
        new user_controller_1.UserController(app, config).initialize(db),
        new error_controller_1.ErrorController(app, config).initialize(db)
    ]);
}).then(function () {
    // Use middlewares
    app.use(morgan('dev'));
    app.use(methodOverride());
    // Start node server.js
    var httpServer = http.createServer(app);
    httpServer.listen(config.portHTTP);
    winston.info("Listening on HTTP port " + config.portHTTP, { process: process.pid });
    // If we use SSL then start listening for that as well
    if (config.ssl) {
        if (config.sslIntermediate != "" && !fs.existsSync(config.sslIntermediate)) {
            winston.error("Could not find sslIntermediate: '" + config.sslIntermediate + "'", { process: process.pid });
            process.exit();
        }
        if (config.sslCert != "" && !fs.existsSync(config.sslCert)) {
            winston.error("Could not find sslIntermediate: '" + config.sslCert + "'", { process: process.pid });
            process.exit();
        }
        if (config.sslRoot != "" && !fs.existsSync(config.sslRoot)) {
            winston.error("Could not find sslIntermediate: '" + config.sslRoot + "'", { process: process.pid });
            process.exit();
        }
        if (config.sslKey != "" && !fs.existsSync(config.sslKey)) {
            winston.error("Could not find sslIntermediate: '" + config.sslKey + "'", { process: process.pid });
            process.exit();
        }
        var caChain = [fs.readFileSync(config.sslIntermediate), fs.readFileSync(config.sslRoot)];
        var privkey = config.sslKey ? fs.readFileSync(config.sslKey) : null;
        var theCert = config.sslCert ? fs.readFileSync(config.sslCert) : null;
        var port = config.portHTTPS ? config.portHTTPS : 443;
        winston.info("Attempting to start SSL server...", { process: process.pid });
        var httpsServer = https.createServer({ key: privkey, cert: theCert, passphrase: config.sslPassPhrase, ca: caChain }, app);
        httpsServer.listen(port);
        winston.info("Listening on HTTPS port " + port, { process: process.pid });
    }
    // Done!
    winston.info("Users is up and running!", { process: process.pid });
}).catch(function (error) {
    winston.error("An error has occurred and the application needs to shut down: '" + error.message + "'", { process: process.pid }, function () {
        process.exit();
    });
});
/**
* Connects to a mongo database
* @param {IConfig} config
* @param {mongodb.ServerOptions} opts Any additional options
* @returns {Promise<mongodb.Db>}
*/
function openDB(config, opts) {
    return new Promise(function (resolve, reject) {
        var mongoServer = new mongodb.Server(config.databaseHost, config.databasePort, opts);
        var mongoDB = new mongodb.Db(config.databaseName, mongoServer, { w: 1 });
        mongoDB.open(function (err, db) {
            if (err || !db)
                reject(err);
            else
                resolve(db);
        });
    });
}
