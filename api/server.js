/**
 * API SERVER
 * The API server handles requests from
 * the public, validates the requests, then
 * performs functions if neccesary.
 */

// Node
var express = require('express');
var mongodb = require('mongodb');
var bodyParser = require('body-parser')
// Custom
var logging = require('../common/logging.js');
var dbservice = require('../mongo/dbservice.js');

console.log("%sBooting API server", logging.api)

// What port should the API server run on?
const SERVER_PORT = 3030;
// The base url of the api
const BASE_URL = '/api';
// App stores the express app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true
}));

app.get(BASE_URL, (req, res) => {
    res.send("You have reached the NASDANQ API server");
});

app.post(`${BASE_URL}/User`, (req, res) => {
    // Get the properties
    var user = req.body.user;

    if (user) {
        // If there is a user value in the post data, add the user
        dbservice.mongoUsers.insertUser(user, function(response) {
            console.log(response);
        });
    }
});

// Listen on the specified port
app.listen(SERVER_PORT, function () {
    console.log("%sAPI server running locally at http://localhost:%s%s", logging.api, SERVER_PORT, BASE_URL);
});