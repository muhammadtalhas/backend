var logging = require('../common/logging.js');
console.log("%sStarting mongodb service", logging.api);
var MongoClient = require('mongodb').MongoClient
var assert = require('assert');

// Connection URL 
var mongoUrl = 'mongodb://localhost:27017/nasdanq';
// Use connect method to connect to the Server 
MongoClient.connect(mongoUrl, function (err, db) {
    assert.equal(null, err);
    console.log("%sConnected correctly to server", logging.api);

    var insertDocuments = function (db, callback) {
        // Get the documents collection 
        var collection = db.collection('documents');
        // Insert some documents 
        collection.insertMany([
            { a: 1 }, { a: 2 }, { a: 3 }
        ], function (err, result) {
            assert.equal(err, null);
            assert.equal(3, result.result.n);
            assert.equal(3, result.ops.length);
            console.log("Inserted 3 documents into the document collection");
            callback(result);
        });
    }
    insertDocuments(db, function() {
        console.log("DOCUMENTS INSERTED");
    });
});


