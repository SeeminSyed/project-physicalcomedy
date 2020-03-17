import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Create from './components/Create';
import ErrorBoundary from './components/ErrorBoundary';


function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Create/>
      </ErrorBoundary>
    </div>
  );
}

export default App;