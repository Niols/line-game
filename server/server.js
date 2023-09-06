const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: { origin: "http://localhost:8080" }
});

io.on('connection', function (socket) {
    console.log('User connected: ' + socket.id);

    socket.on('disconnect', function () {
        console.log('User disconnected: ' + socket.id);
    });
});

server.listen(3000, function () {
  console.log('Listening on *:3000.');
});