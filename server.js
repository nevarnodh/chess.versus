const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/chessdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/chessdb' })
}));

app.use('/api/users', require('./routes/users'));
app.use('/api/games', require('./routes/games'));

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('joinGame', (gameId) => {
    socket.join(gameId);
  });

  socket.on('makeMove', (data) => {
    const { gameId, move } = data;
    // Update game state
    io.to(gameId).emit('moveMade', move);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => console.log('Server running on port 3000'));

