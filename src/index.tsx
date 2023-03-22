import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';
import App from './App';
import Overlay from './Overlay';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <div id='container'>
      <App />
      <div id='inner'>
        <Overlay />
      </div>
    </div>
  </React.StrictMode>
);