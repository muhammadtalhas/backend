// Logging
var logging = require('../common/logging.js');
/**
 * BOOT SCRIPT
 * This script boots the API and the
 * Logic servers depending on config.
 */

// Get our logic server
var logic = require('../logic/server.js');
// Get our api server
var api = require('../api/server.js');

console.log("%sBooting server, please stand by...", logging.bt);

/**
 * Which servers should be booted?
 * Edit these values to choose which
 * servers to boot. In production, 
 * both should be enabled.
 */
var bootLogic = true; 
var bootApi = true;

if (bootLogic)
    var logicServer = logic;
if  (bootApi)
    var apiServer = api;