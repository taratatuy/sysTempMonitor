const path = require('path');
const express = require('express');

const { channel } = require('./core.js');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const port = 10252;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

channel.on('tempChange', (data) => {
  io.emit('update', data);
});
channel.on('sendArray', (data) => {
  io.emit('load', data);
});

io.on('connect', () => {
  channel.emit('getArray');
});

server.listen(port, console.log(`Listening on port ${port}`));
