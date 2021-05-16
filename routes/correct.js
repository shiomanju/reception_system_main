var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('correct',{roomName:'修正'});
});

module.exports = router;
