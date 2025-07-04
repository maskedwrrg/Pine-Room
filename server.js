// server.js
const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 3000 });

const clients = new Set();

server.on('connection', socket => {
  clients.add(socket);

  socket.on('message', message => {
    // Broadcast to all clients
    for (const client of clients) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    }
  });

  socket.on('close', () => {
    clients.delete(socket);
  });
});

console.log('WebSocket server running on ws://localhost:3000');
