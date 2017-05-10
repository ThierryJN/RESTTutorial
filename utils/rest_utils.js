/**
 * Created by ThierryN1 on 5/9/2017.
 */
var _ = require('lodash');

//Just dealing with MongoDB's projection
module.exports.getProjection = function (request) {
    return (request.query.fields) ?
        _.replace(request.query.fields, ',', ' ')
        : '';
};

//TODO - Add sorting

//Formatting a successful response with metadata
module.exports.getResponse = function (message, request, data) {
    return {
        "status": "SUCCESS",
        "message": message,
        "data":data,
        "metadata": {
            "count": data.length}
    };
}

//TODO - Need implementation
// Formatting an error response with metadata
module.exports.getErrorResponse = function (request, error) {
    return error;
}