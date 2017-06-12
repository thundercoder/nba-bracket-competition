const express = require('express');
const router = express.Router();

var MongoClient = require('mongodb').MongoClient, 
    assert = require('assert'),
    util = require('util');

var db;

// Connection URL
var url = 'mongodb://admin:admin1234@ds115712.mlab.com:15712/nba-bracket-competition';

// Use connect method to connect to the server
MongoClient.connect(url, (err, database) => {
  if (err) 
    return console.log(err);
  
  db = database;
});

//Get api listing
router.get('/', (req, res) => {
    db.collection('teams').find().toArray((err, result) => {
    if (err) return console.log(err);
    
    res.send(result);
  });
});

router.post('/:urlparam', function(req, res) {

  // VALIDATION
  // checkBody only checks req.body; none of the other req parameters
  // Similarly checkParams only checks in req.params (URL params) and
  // checkQuery only checks req.query (GET params).
  req.checkBody('postparam', 'Invalid postparam').notEmpty().isInt();
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid getparam').isInt();

  // OR assert can be used to check on all 3 types of params.
  // req.assert('postparam', 'Invalid postparam').notEmpty().isInt();
  // req.assert('urlparam', 'Invalid urlparam').isAlpha();
  // req.assert('getparam', 'Invalid getparam').isInt();

  // SANITIZATION
  // as with validation these will only validate the corresponding
  // request object
  req.sanitizeBody('postparam').toBoolean();
  req.sanitizeParams('urlparam').toBoolean();
  req.sanitizeQuery('getparam').toBoolean();

  // OR find the relevent param in all areas
  req.sanitize('postparam').toBoolean();

  // Alternatively use `var result = yield req.getValidationResult();`
  // when using generators e.g. with co-express
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    res.json({
      urlparam: req.params.urlparam,
      getparam: req.query.getparam,
      postparam: req.body.postparam
    });
  });
});

module.exports = router;