/**
 * Created by ThierryN1 on 5/8/2017.
 */

var Fs = require('fs');
var _ = require('lodash');

var server = require('./server');

// =============== Routes for our API =======================
Fs.readdirSync('./routes').forEach(function(file) {
    _.each(require('./routes/' + file), function(routes) {
        server.route(routes);
    });
});

// =============== Start our Server =======================
// Lets start the server
server.start(function () {
    console.log('Server running at:', server.info.uri);
});

module.exports = server;