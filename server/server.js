const server = require('http').createServer(require('express')());
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: "http://localhost:8080" }
});

let players = [];

io.on('connection', function (socket) {
  console.log('User connected: ' + socket.id);

  let player = { id: socket.id, socketId: socket.id };
  players.push(player);
  socket.emit('welcome', player.id);

  socket.on('dealCards', function () {
    io.emit('dealCards');
  });

  socket.on('cardPlayed', function (gameObject) {
    io.emit('cardPlayed', gameObject, player.id);
  });

  socket.on('disconnect', function () {
    console.log('User disconnected: ' + socket.id);
    players = players.filter(player => player.socketId !== socket.id);
  });
});

server.listen(3000, function () {
  console.log('Listening on *:3000');
});
