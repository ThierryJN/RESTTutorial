/**
 * Created by ThierryN1 on 5/9/2017.
 */

var Joi = require('Joi');
var UserModel = require('../models/user_model');
var Utils = require('../utils/rest_utils');

var routes = [];
// =============== Routes for our API =======================
routes.push({
    method: 'GET',
    path: '/api/users',
    config: {
        // Include this API in swagger documentation
        tags: ['api'],
        description: 'Get All User data',
        notes: 'This also handles the projection with api/users?fields=name'
    },
    handler: function (request, reply) {
        UserModel.find({}, Utils.getProjection(request), function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: Utils.getErrorResponse(request, error)
                });
            } else {
                reply({
                    statusCode: 200,
                    response: Utils.getResponse('User Data Successfully Fetched',request, data)
                });
            }
        });
    }
});
routes.push({
    method: 'GET',
    path: '/api/users/{id}',
    config: {
        tags: ['api'],
        description: 'Get specific user data',
        notes: 'Get specific user data',
        validate: {
            // Id is required field
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: function (request, reply) {
        //Finding user for particular userID
        UserModel.find({_id: request.params.id}, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                if (data.length === 0) {
                    reply({
                        statusCode: 200,
                        message: 'User Not Found',
                        data: data
                    });
                } else {
                    reply({
                        statusCode: 200,
                        message: 'User Data Successfully Fetched',
                        data: data
                    });
                }
            }
        });
    }
});
routes.push({
    method: 'PUT',
    path: '/api/users/{id}',
    config: {
        // Swagger documentation fields tags, description, note
        tags: ['api'],
        description: 'Update specific user data',
        notes: 'Update specific user data',
        // Joi api validation
        validate: {
            params: {
                //`id` is required field and can only accept string data
                id: Joi.string().required()
            },
            payload: {
                name: Joi.string(),
                age: Joi.number()
            }
        }
    },
    handler: function (request, reply) {
        // `findOneAndUpdate` is a mongoose modal methods to update a particular record.
        UserModel.findOneAndUpdate({_id: request.params.id}, request.payload, function (error, data) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Failed to get data',
                    data: error
                });
            } else {
                reply({
                    statusCode: 204,
                    message: 'User Updated Successfully',
                    data: data
                });
            }
        });

    }
});
routes.push({
    method: 'POST',
    path: '/api/users',
    config: {
        // "tags" enable swagger to document API
        tags: ['api'],
        description: 'Save user data',
        notes: 'Save user data',
        // We use Joi plugin to validate request
        validate: {
            payload: {
                // Both name and age are required fields
                name: Joi.string().required(),
                age: Joi.number().required()
            }
        }
    },
    handler: function (request, reply) {
        // Create mongodb user object to save it into database
        var user = new UserModel(request.payload);
        // Call save methods to save data into database
        // and pass callback methods to handle error
        user.save(function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: error
                });
            } else {
                reply({
                    statusCode: 201,
                    message: 'User Saved Successfully'
                });
            }
        });
    }
});
routes.push({
    method: 'DELETE',
    path: '/api/users/{id}',
    config: {
        tags: ['api'],
        description: 'Remove specific user data',
        notes: 'Remove specific user data',
        validate: {
            params: {
                id: Joi.string().required()
            }
        }
    },
    handler: function (request, reply) {
        // `findOneAndRemove` is a mongoose methods to remove a particular record into database.
        UserModel.findOneAndRemove({_id: request.params.id}, function (error) {
            if (error) {
                reply({
                    statusCode: 503,
                    message: 'Error in removing User',
                    data: error
                });
            } else {
                reply({
                    statusCode: 204,
                    message: 'User Deleted Successfully'
                });
            }
        });

    }
});

// ===========================================================
module.exports = routes;
