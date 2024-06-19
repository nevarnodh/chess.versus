const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');

const app = express();

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

app.listen(3000, () => console.log('Server running on port 3000'));

