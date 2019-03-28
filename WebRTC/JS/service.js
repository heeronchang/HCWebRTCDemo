const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.Server(app);
const io = socket(server);

io.on('connection', (socket) => {
  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user disconnect');
  });
});

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.listen(3000, () => {
  console.log('app is running at http://127.0.0.1:3000');
});
