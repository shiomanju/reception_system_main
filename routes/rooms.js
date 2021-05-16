var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/1',function(req,res,next){
  res.render('rooms',{roomName:'診察室1'})
})
router.get('/2',function(req,res,next){
  res.render('rooms',{roomName:'診察室2'})
})
router.get('/3',function(req,res,next){
  res.render('rooms',{roomName:'診察室3'})
})
router.get('/4',function(req,res,next){
  res.render('rooms',{roomName:'診察室4'})
})
router.get('/5',function(req,res,next){
  res.render('rooms',{roomName:'診察室5'})
})
router.get('/6',function(req,res,next){
  res.render('rooms',{roomName:'診察室6'})
})
router.get('/7',function(req,res,next){
  res.render('rooms',{roomName:'診察室7'})
})
router.get('/8',function(req,res,next){
  res.render('rooms',{roomName:'診察室8'})
})
router.get('/9',function(req,res,next){
  res.render('rooms',{roomName:'診察室9'})
})
router.get('/10',function(req,res,next){
  res.render('rooms',{roomName:'診察室10'})
})
router.get('/11',function(req,res,next){
  res.render('rooms',{roomName:'診察室11'})
})
router.get('/12',function(req,res,next){
  res.render('rooms',{roomName:'診察室12'})
})
router.get('/13',function(req,res,next){
  res.render('rooms',{roomName:'診察室13'})
})
module.exports = router;
