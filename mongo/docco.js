var dbconfig = require('./dbconfig');

module.exports = {
    InsertSomeDoccos: function () {
        dbconfig.mongoClient.connect(dbconfig.mongoUrl, function (err, db) {
            dbconfig.assert.equal(null, err);
            var insertDocuments = function (db, callback) {
                // Get the documents collection 
                var collection = db.collection('documents');
                // Insert some documents 
                collection.insertMany([
                    { a: 1 }, { a: 2 }, { a: 3 }
                ], function (err, result) {
                    dbconfig.assert.equal(err, null);
                    dbconfig.assert.equal(3, result.result.n);
                    dbconfig.assert.equal(3, result.ops.length);
                    callback(result);
                });
            }
            insertDocuments(db, function () {
                console.log("Inserted 3 documents into the document collection");
            });

        });
    }
}
