import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Receive from './components/Receive'
import Connect from './components/Connect';

function App() {
  return (
    <div className="App">
      <Receive/>
      {<Connect/>}
    </div>
  );
}

export default App;
