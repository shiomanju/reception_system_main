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
var correctRouter=require('./routes/correct');
var callMonitorRouter=require('./routes/callMonitor');
// socket.io routes
let main = require('./data')
let callList;
io.on('connection', function (socket) {
  socket.on('request', (data) => {
    switch (data.method) {
      case 'add':
        main.add(data.detail);
        resList();
        break;
      case 'room-call':
        callList=main.call(data.detail,'部屋');
        io.emit('callList',{value:callList});
        break;
      case 'enter':
        main.changeStatus(data.detail, '診察室');
        resList();
        break;
      case 'leave':
        main.changeStatus(data.detail, '会計');
        resList();
        break;
      case 'acco-call':
        callList=main.call(data.detail,'会計');
        io.emit('callList',{value:callList})
        break;
      case 'end':
        main.changeStatus(data.detail, '終了');
        resList();
        break;
      case 'reqList':
        resList();
        break;
      case 'reception':
        main.changeStatus(data.detail,'受付');
        resList();
        break;
      default:
        main.changeRoom(data.detail,data.method);
        resList();
        break;
    }
    if(data.correct==='true'){
      io.emit('correct',{num:data.detail,detail:data.method})
    }
   
  })
})

//リストの送信
function resList(){
  io.emit('resList', { value: main.fileOutput() });
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//ルーターの登録
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reception', receptionRouter);
app.use('/rooms', roomsRouter);
app.use('/accounting', accountingRouter);
app.use('/correct',correctRouter);
app.use('/monitor',callMonitorRouter);

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
