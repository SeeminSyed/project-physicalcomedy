import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Create from './components/Create';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <div className="App">
      To play charades, add /charades to the url.
      To play pictionary, add /pictionary to the url.
    </div>
  );
}

export default App;