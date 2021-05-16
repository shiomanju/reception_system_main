var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('correct',{roomName:'correct'});
});

module.exports = router;
