import React from 'react';
import DoodlePeer from '../components/DoodlePeer';
import ErrorBoundary from '../components/ErrorBoundary';

function Pictionary() {
  return (
    <div className="App">
      {/* TODO: Add pictionary components here */}
      {/* Pictionary Components */}
      <ErrorBoundary>
        <DoodlePeer />
      </ErrorBoundary>
    </div>
  );
}

export default Pictionary;