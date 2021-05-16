var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('correct');
});

module.exports = router;
