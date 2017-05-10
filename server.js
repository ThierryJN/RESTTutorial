/**
 * Created by ThierryN1 on 5/8/2017.
 */
// ================ Base Setup ========================
// Include Hapi package
var Hapi = require('hapi');
var Pack = require('./package.json');

// Create Server Object
var initialized_server = new Hapi.Server();
var mongoose   = require('mongoose');
var config = require('./config/test_config');
mongoose.connect(config.DBHost); // connect to local database

// Define PORT number
initialized_server.connection({port: config.DBPort});

// Register Swagger Plugin ( Use for documentation and testing purpose )
initialized_server.register({
    register: require('hapi-swagger'),
    options: {
        info: {
            title: Pack.name,
            description: Pack.description,
            version: Pack.version
        }
    }
}, function (err) {
    if (err) {
        initialized_server.log(['error'], 'hapi-swagger load error: ' + err)
    } else {
        initialized_server.log(['start'], 'hapi-swagger interface loaded')
    }
});

module.exports = initialized_server;