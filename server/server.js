const server = require('http').createServer(require('express')());
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: "http://localhost:8080" }
});

let players = [];

io.on('connection', function (socket) {
    console.log('User connected: ' + socket.id);

    players.push(socket.id);

    if (players.length === 1) {
        io.emit('isPlayerA');
    };

    socket.on('dealCards', function () {
        io.emit('dealCards');
    });

    socket.on('cardPlayed', function (gameObject, isPlayerA) {
        io.emit('cardPlayed', gameObject, isPlayerA);
    });

    socket.on('disconnect', function () {
        console.log('User disconnected: ' + socket.id);
        players = players.filter(player => player !== socket.id);
    });
});

server.listen(3000, function () {
  console.log('Listening on *:3000');
});
