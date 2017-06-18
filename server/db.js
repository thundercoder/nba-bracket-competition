var MongoClient = require('mongodb').MongoClient, 
    assert = require('assert');

var state = {
    db: null
}

// Connection URL
var url = 'mongodb://admin:admin1234@ds115712.mlab.com:15712/nba-bracket-competition';

// Use connect method to connect to the server
exports.connect = function(){
    MongoClient.connect(url, (err, database) => {
      if (err) 
        return console.log(err);
      
      state.db = database;
    });
};

exports.get = function() {
  return state.db
}

exports.close = function(done) {
  if (state.db) {
    state.db.close(function(err, result) {
      state.db = null
      state.mode = null
      done(err)
    })
  }
}