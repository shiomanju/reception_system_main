var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rooms',{roomName:'room0'});
});
router.get('/1',function(req,res,next){
  res.render('rooms',{roomName:'room1'})
})
router.get('/2',function(req,res,next){
  res.render('rooms',{roomName:'room2'})
})
router.get('/3',function(req,res,next){
  res.render('rooms',{roomName:'room3'})
})
router.get('/4',function(req,res,next){
  res.render('rooms',{roomName:'room4'})
})
router.get('/5',function(req,res,next){
  res.render('rooms',{roomName:'room5'})
})
router.get('/6',function(req,res,next){
  res.render('rooms',{roomName:'room6'})
})
router.get('/7',function(req,res,next){
  res.render('rooms',{roomName:'room7'})
})
router.get('/8',function(req,res,next){
  res.render('rooms',{roomName:'room8'})
})
router.get('/9',function(req,res,next){
  res.render('rooms',{roomName:'room9'})
})
router.get('/10',function(req,res,next){
  res.render('rooms',{roomName:'room10'})
})
router.get('/11',function(req,res,next){
  res.render('rooms',{roomName:'room11'})
})
router.get('/12',function(req,res,next){
  res.render('rooms',{roomName:'room12'})
})
router.get('/13',function(req,res,next){
  res.render('rooms',{roomName:'room13'})
})
module.exports = router;
