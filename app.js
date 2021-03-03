const express = require('express');

const { tempListener } = require('./core/temp-listener.js');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname + '/public/'));

const port = 10252;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

tempListener.on('tempChange', (data) => {
  io.emit('update', data);
});

tempListener.on('sendArray', (data) => {
  io.emit('load', data);
});

io.on('connect', () => {
  tempListener.emit('getArray');
});

server.listen(port, console.log(`Listening on port ${port}`));
