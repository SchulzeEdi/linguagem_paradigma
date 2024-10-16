import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import Sala from './components/Sala';
import Cozinha from './components/Cozinha';
import Quarto from './components/Quarto';

const App: React.FC = () => {
  
  return (
    <body>
      <h1>Casa Inteligente</h1>
      <div className="container">
        <div className="block"><Cozinha/></div>
        <div className="block"><Sala/></div>
        <div className="block"><Quarto/></div>
      </div>
      <footer>
        <p>Ederson Schulze e Ramon Valentim</p>
      </footer>
    </body>
  );
}

export default App;
