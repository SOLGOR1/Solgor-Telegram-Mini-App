import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Stelle sicher, dass das Element mit der ID 'root' vorhanden ist
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

// Erstelle und rendere die React-Anwendung
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);