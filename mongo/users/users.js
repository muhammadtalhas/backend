// Import config
var dbconfig = require('../dbconfig');

module.exports = {
    insertUser: function (username, CB) {
        dbconfig.mongoClient.connect(dbconfig.mongoUrl, function (err, db) {
            if (err) {
                // Could not connect to mongo
                CB(err);
            } else {
                var run = (db, callback) => {
                    db.collection('users').insert(
                        { username: username }
                        , function (err, result) {
                            callback(result);
                        });
                }
                run(db, function (result) {
                    // Callback runs when completed the query
                    CB(result);
                });
            }
        });
    }
}