const stockfish = require('stockfish');

const engine = stockfish();

function initStockfish() {
  return new Promise((resolve) => {
    engine.onmessage = (event) => {
      if (event.includes('Stockfish')) {
        resolve();
      }
    };
    engine.postMessage('uci');
  });
}

async function getBestMove(fen) {
  return new Promise((resolve) => {
    engine.onmessage = (event) => {
      if (event.includes('bestmove')) {
        resolve(event.split(' ')[1]);
      }
    };
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 15');
  });
}

module.exports = { initStockfish, getBestMove };

