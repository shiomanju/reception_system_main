var express = require('express');
var app = express();
var server = require('http').createServer(app);
var { Server } = require('socket.io');
var io = new Server(server);
var fs = require('fs');

app.get("/", function (request, response) {
  response.render(fs.readFileSync('index.html'))
  response.write(fs.readFileSync('index.html'));
  response.end();
});
app.get("/reception", function (request, response) {
  response.write(fs.readFileSync('reception.html'));
  response.end();
});
app.get("/room", function (request, response) {
  response.write(fs.readFileSync('room.html'));
  response.end();
});
app.get("/accounting", function (request, response) {
  response.write(fs.readFileSync('accounting.html'));
  response.end();
});

const main = require('./data');
io.on('connection', function (socket) {
  socket.on('client_to_server', function (data) {
    switch (data.meth) {
      case 'add':
        main.add(data.value);
        break;
      default:
        break;
    }
    const list = main.allList();
    io.emit('server_to_client', { value: list })
  })
  socket.on('client_to_server_personal', function (data) {
    switch (data.meth) {
      case 'enter':
        console.log(main.fileOutput());
        let x = listCheck(main.fileOutput(), 'room1', 'reception');
        console.log('app44' + x);
        if (x === 'null') {
          const id = socket.id;
          console.log('app34' + id);
          io.to(id).emit('server_to_client', { value: 'nothing', meth: 'enter' });
        } else {
          main.changeStatus(x, 'room');
        }
        break;
        case 'leave':
          let y = listCheck(main.fileOutput(), 'room1', 'room');
          if (y === 'null') {
            const id = socket.id;
            io.to(id).emit('server_to_client', { value: 'nothing', meth: 'leave' });
          } else {
            console.log('app57');
            main.changeStatus(y, 'accounting');
          }
          break;
      case 'end':
        let z = listCheck(main.fileOutput(), 'room1', 'accounting');
        if (z === 'null') {
          const id = socket.id;
          io.to(id).emit('server_to_client', { value: 'nothing', meth: 'end' });
        } else {
          console.log('app67');
          main.changeStatus(z, 'end');
        }
        break;
    }
    const list = main.allList();
    io.emit('server_to_client', { value: list })

  })
})

function listCheck(list, room, status) {
  for (i = 0; i < list.length; i++) {
    if (list[i].room === room && list[i].status === status) {
      console.log(i);
      return i;
    }
  }
  return 'null';
}

server.listen(8000,);
