const express = require('express');
const router = express.Router();
const util = require('util');

var db = require('../db');

db.connect();

//Get api listing
router.get('/teams', (req, res) => {
    var collection = db.get().collection('teams');
    
    collection.find().toArray((err, result) => {
    if (err) return console.log(err);
    
    res.send(result);
  });

});

router.get('/team/:teamShortName/detail', function (req, res) {
  var collection = db.get().collection('teams');
    
    collection.find({shortName: req.params.teamShortName}).toArray((err, result) => {
      if (err) return console.log(err);
      
      res.send(result);
    });
})

router.post('/team/create', function(req, res) {

  // VALIDATION
  // checkBody only checks req.body; none of the other req parameters
  // Similarly checkParams only checks in req.params (URL params) and
  // checkQuery only checks req.query (GET params).
  req.checkBody({
    'name': {
      notEmpty: true,
      errorMessage: 'The name is required'
    },
    'shortName': {
      notEmpty: true,
      errorMessage: 'The shortName is required'
    },
    'nameImage': {
      optional: true
    },
    userUpdate: {
      optional: true
    }
  });
  
  // Alternatively use `var result = yield req.getValidationResult();`
  // when using generators e.g. with co-express
  req.getValidationResult().then(function(result) {
    if (!result.isEmpty()) {
      res.status(400).send('There have been validation errors: ' + util.inspect(result.array()));
      return;
    }
    
    var collection = db.get().collection('teams');
    
    collection.insertOne(req.body, function(err, records) {
      if (err) return console.log(err);
      
      res.send(records);
    });
  });
  
});

module.exports = router;