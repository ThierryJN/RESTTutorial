/**
 * Created by ThierryN1 on 5/8/2017.
 */
// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('hapi');

// Create Server Object
var server = new Hapi.Server();

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost/restdemo'); // connect to local database

// Define PORT number
server.connection({port: 7002});

// Register Swagger Plugin ( Use for documentation and testing purpose )
server.register({
    register: require('hapi-swagger'),
    options: {
        apiVersion: "0.0.1"
    }
}, function (err) {
    if (err) {
        server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        server.log(['start'], 'hapi-swagger interface loaded')
    }
});

module.exports = server;