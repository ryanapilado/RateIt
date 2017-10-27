// From http://stackoverflow.com/questions/24621940/how-to-properly-reuse-connection-to-mongodb-across-nodejs-application-and-module

var MongoClient = require('mongodb').MongoClient;
var autoIncrement = require("mongodb-autoincrement");

var _db;

module.exports = {

  connectToServer: function(callback) {
    MongoClient.connect('mongodb://localhost:27017/a2-db', function(err, db) {
      _db = db;
      return callback(err);
    });
  },

  getDB: function() {
    return _db;
  },

  getAutoIndex: function (collectionName, callback) {
    autoIncrement.getNextSequence(_db, collectionName, function (err, autoIndex) {
        callback(autoIndex);
    });
  }
  
};