import React from 'react';
import { render } from 'react-dom';
import TimelineContainer from './timelineContainer';
import './index.css';

const App = () => (
  <div
    style={{
      width: '80%',
      margin: 'auto',
    }}>
    <h2>Start editing to see some magic happen {'\u2728'}</h2>
    <div style={{
      overflow: 'hidden',
      borderRadius: 5,
      border: '1px solid rgba(0,0,0,0.12)'
    }}>
      <TimelineContainer />
    </div>
  </div>
);

render(<App />, document.getElementById('root'));
