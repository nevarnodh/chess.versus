import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Chess.Versus</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/game">Play as Guest</Link>
    </div>
  );
}

export default Home;

