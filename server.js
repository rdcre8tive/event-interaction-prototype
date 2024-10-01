const express = require('express');
const app = express();

// ... rest of your server code ...

import http from 'http';
import { Server } from 'socket.io';
import EventRoom from './EventRoom.js';  // Adjust the path as needed

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Server is running');
});

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  const room = new EventRoom(socket.room);
  
  socket.on('message', (message) => {
    room.onMessage(message, socket);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});