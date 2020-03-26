import React from 'react';
// import logo from './logo.svg';
import Peer2Peer from '../components/Peer2Peer';
import ErrorBoundary from '../components/ErrorBoundary';


function Charades() {
  return (
    <div className="App">
      <ErrorBoundary>
        <Peer2Peer/>
      </ErrorBoundary>
    </div>
  );
}

export default Charades;