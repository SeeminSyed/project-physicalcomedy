import React from 'react';
// import logo from './logo.svg';
import Create from '../components/Create';
import ErrorBoundary from '../components/ErrorBoundary';


function Charades() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Create/>
      </ErrorBoundary>
    </div>
  );
}

export default Charades;