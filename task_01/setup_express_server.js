// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'chessversussecret',
  resave: false,
  saveUninitialized: true
}));

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/chessversus', { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
const userRoutes = require('./routes/users');
const gameRoutes = require('./routes/games');

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

