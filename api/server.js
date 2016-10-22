/**
 * API SERVER
 * The API server handles requests from
 * the public, validates the requests, then
 * performs functions if neccesary.
 */

// Node
var express = require('express');
var mongodb = require('mongodb');
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

app.get(BASE_URL, (req, res) => {
    res.send("You have reached the NASDANQ API server");
    dbservice.insertSomeDoccos();
});

// Listen on the specified port
app.listen(SERVER_PORT, function() {
    console.log("%sAPI server running locally at http://localhost:%s%s", logging.api, SERVER_PORT, BASE_URL);
});