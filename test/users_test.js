/**
 * Created by ThierryN1 on 5/9/2017.
 */

var server = require('../');

var code = require('code');   // assertion library
var _lab = require('lab');
var lab = module.exports = _lab.script();


lab.experiment("READ", function() {
    //TODO - Add before (insert documents in Mongo)
    lab.test("get all users", function (done) {
        var options = {
            method: "GET",
            url: "/api/users"
        };
        server.inject(options, function (response) {
            var result = response.result;
            code.expect(result.statusCode).to.equal(200);
            code.expect(result.response.data).to.be.instanceof(Array);
            code.expect(result.response.data).to.have.length(2);
            done();
        });
    });
    lab.test("get all users name", function (done) {
        var options = {
            method: "GET",
            url: "/api/users?fields=name"
        };
        server.inject(options, function (response) {
            var result = response.result;
            code.expect(result.statusCode).to.equal(200);
            code.expect(result.response.data).to.be.instanceof(Array);
            code.expect(result.response.data).to.have.length(2);
            //The age should not be present
            code.expect(result.response.data[0].age).to.not.exist();
            done();
        });
    });
});