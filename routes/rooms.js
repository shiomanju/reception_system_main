var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/1',function(req,res,next){
  res.render('rooms',{roomName:'診療室1'})
})
router.get('/2',function(req,res,next){
  res.render('rooms',{roomName:'診療室2'})
})
router.get('/3',function(req,res,next){
  res.render('rooms',{roomName:'診療室3'})
})
router.get('/4',function(req,res,next){
  res.render('rooms',{roomName:'診療室4'})
})
router.get('/5',function(req,res,next){
  res.render('rooms',{roomName:'診療室5'})
})
router.get('/6',function(req,res,next){
  res.render('rooms',{roomName:'診療室6'})
})
router.get('/7',function(req,res,next){
  res.render('rooms',{roomName:'診療室7'})
})
router.get('/8',function(req,res,next){
  res.render('rooms',{roomName:'診療室8'})
})
router.get('/9',function(req,res,next){
  res.render('rooms',{roomName:'診療室9'})
})
router.get('/10',function(req,res,next){
  res.render('rooms',{roomName:'診療室10'})
})
router.get('/11',function(req,res,next){
  res.render('rooms',{roomName:'診療室11'})
})
router.get('/12',function(req,res,next){
  res.render('rooms',{roomName:'診療室12'})
})
router.get('/13',function(req,res,next){
  res.render('rooms',{roomName:'診療室13'})
})
module.exports = router;
