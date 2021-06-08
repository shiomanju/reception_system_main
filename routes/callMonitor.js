var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('callMonitor',{roomName:'callMonitor'});
});

module.exports = router;
