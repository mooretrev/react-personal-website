"use strict";
/**
 * Module dependencies.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
var app_js_1 = __importDefault(require("./app.js"));
/**
 * Get port from environment and store in Express.
 */
/* eslint-disable no-use-before-define */
var port = normalizePort(process.env.PORT || '9000');
app_js_1.default.set('port', port);
/**
 * Create HTTP server.
 */
var server = http_1.default.createServer(app_js_1.default);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var portValue = parseInt(val, 10);
    if (portValue.isNaN) {
        // named pipe
        return val;
    }
    if (portValue >= 0) {
        // port number
        return portValue;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    var bind = typeof port === 'string'
        ? "Pipe " + port
        : "Port " + port;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            /* eslint-disable no-console */
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case 'EADDRINUSE':
            /* eslint-disable no-console */
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? "pipe " + addr
        : "port " + addr.port;
    /* eslint-disable no-console */
    console.log("Listening on " + bind);
}
