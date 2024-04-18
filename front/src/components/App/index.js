import React, { useState, useEffect } from 'react';
import Home from '../Home';
import Game from '../../class/Game';

const game = new Game();
game.setUrl();

const App = () => {
  return (
    <>
      <Home game={game} />
    </>
  );
};

export default App;
