import React from 'react';
import CardsDeck from './CardsDeck';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Card Game</h1>
      <CardsDeck />
    </div>
  );
}

export default App;