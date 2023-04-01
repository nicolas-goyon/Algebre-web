import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './drag-and-drop-example/App';
// import App from './App';

const rootElement = document.getElementById('root');

if (rootElement instanceof Element) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  throw new Error('Could not find root element');
}

