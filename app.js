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
// socket.io routes
let main = require('./data')

io.on('connection', function (socket) {
  socket.on('request', (data) => {
    switch (data.method) {
      case 'add':
        main.add(data.detail);
        resList();
        break;
      case 'room-call':

        break;
      case 'enter':
        main.changeStatus(data.detail, 'room');
        resList();
        break;
      case 'leave':
        main.changeStatus(data.detail, 'accounting');
        resList();
        break;
      case 'acco-call':

        break;
      case 'end':
        main.changeStatus(data.detail, 'end');
        resList();
    }
   
  })
})

function resList(){
  io.emit('resList', { value: main.fileOutput() });
}

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reception', receptionRouter);
app.use('/rooms', roomsRouter);
app.use('/accounting', accountingRouter);
app.use('/correct',correctRouter);



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
