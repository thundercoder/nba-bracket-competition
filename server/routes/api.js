const express = require('express');
const router = express.Router();
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

router.post('/:urlparam', function(req, res) {

  // VALIDATION
  // checkBody only checks req.body; none of the other req parameters
  // Similarly checkParams only checks in req.params (URL params) and
  // checkQuery only checks req.query (GET params).
  req.checkBody({
    'contact.email': {
      isEmail: {
        errorMessage: 'Invalid Email'
      }
    }
  });
  req.checkParams('urlparam', 'Invalid urlparam').isAlpha();
  req.checkQuery('getparam', 'Invalid getparam').isInt();

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
      body: req.body
    });
  });
});

module.exports = router;