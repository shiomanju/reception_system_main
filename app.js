var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var express = require('express');
var app = express();
var http = require('http');
var server = http.createServer(app);
var { Server } = require('socket.io');
const io = new Server(server);
server.listen(8000);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var receptionRouter = require('./routes/reception');
var roomsRouter = require('./routes/rooms');
var accountingRouter = require('./routes/accounting');
var correctRouter = require('./routes/correct');
var callMonitorRouter = require('./routes/callMonitor');
var informationText=require('./routes/informationText');
// socket.io routes
let main = require('./data')
let num = 0;
io.on('connection', function (socket) {
  socket.on('request', (data) => {
    switch (data.method) {
      case 'add': //受付で追加
        num = main.add(data.detail);
        io.emit('print', { room: data.detail, num: num });
        io.emit('resList', { value: main.fileOutput() }); break;
      case 'call'://呼び出し
        console.log('appcall');
        callList = main.call('add', data.detail);
        io.emit('callList', { value: callList, speech: true });
        io.emit('call', data.detail);
        break;
      case 'enter'://入室
        main.changeStatus(data.detail, '診療室');
        io.emit('resList', { value: main.fileOutput() });
        main.call('dell', data.detail);
        io.emit('callList', { value: callList, speech: false });
        break;
      case 'leave'://退室
        main.changeStatus(data.detail, '会計');
        io.emit('resList', { value: main.fileOutput() });
        break;
      /*case 'acco-call':
        callList=main.call(data.detail,'会計');
        io.emit('callList',{value:callList})
        break;*/
      case 'end'://会計終了
        main.changeStatus(data.detail, '終了');
        io.emit('resList', { value: main.fileOutput() });
        main.call('dell', data.detail);
        io.emit('callList', { value: callList, speech: false });
        break;
      case 'reqList'://リスト要求
        io.emit('resList', { value: main.fileOutput() });
        break;
      case 'reception'://?
        main.changeStatus(data.detail, '受付');
        io.emit('resList', { value: main.fileOutput() });
        break;
      case 'newRoom'://部屋変更
        main.changeRoom(data.detail.num, data.detail.room);
        io.emit('resList', { value: main.fileOutput() });
        io.emit('correct', { num: data.detail.num, detail: data.detail.room });
        break;
      case 'newStatus'://ステータス変更
        main.changeStatus(data.detail.num, data.detail.status);
        io.emit('resList', { value: main.fileOutput() });
        io.emit('correct', { num: data.detail.num, detail: data.detail.status })
        break;
      case 'cancel'://呼び出しキャンセル
        console.log('appcancel');
        callList = main.call('dell', data.detail);
        io.emit('callList', { value: callList, speech: true });
    }
  })
  socket.on('infoText',(data)=>{
    switch(data.meth){
      case 'req'://モニター表示文章要求
        io.emit('resText',{text:main.InTeOUT()});
        break;
      case 'send'://モニター表示文章送る
        io.emit('infoText',{text:data.text});
        break;
    }
    
  })
})




app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//ルーターの登録
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reception', receptionRouter);
app.use('/rooms', roomsRouter);
app.use('/accounting', accountingRouter);
app.use('/correct', correctRouter);
app.use('/monitor', callMonitorRouter);
app.use('/informationText',informationText);

app.use(express.static('public'));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
