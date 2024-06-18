// models/Game.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  players: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  moves: [{ from: String, to: String }],
  result: { type: String, enum: ['win', 'loss', 'draw'], default: 'draw' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);

