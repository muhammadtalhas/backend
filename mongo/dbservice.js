/**
 * DATABASE SERVICE
 * All connections to the mongo
 * database must go through this script
 */

// Node
// Custom
var logging = require('../common/logging.js');

console.log("%sDatabase service running", logging.api);

// Custom db functions
var mongo_Users = require('./users/users.js');

module.exports = {
    mongoUsers: mongo_Users
}