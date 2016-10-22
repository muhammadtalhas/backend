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
var mongo_Docco = require('./docco.js');

module.exports = {
    insertSomeDoccos: function () {
        console.log("Attempting to insert some docco");
        mongo_Docco.InsertSomeDoccos()
    }
}