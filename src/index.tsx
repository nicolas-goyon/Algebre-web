import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { MathJaxContext } from 'better-react-mathjax';
import App from './App';

const rootElement = document.getElementById('root');
// console.log(process.env.REACT_APP_DATABASE_URL);
const config = {
  loader: { load: ["[tex]/html"] },
  tex: {
    packages: { "[+]": ["html"] },
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"]
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"]
    ]
  }
};
if (rootElement instanceof Element) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MathJaxContext version={3} config={config}>
        <App />
      </MathJaxContext>
    </React.StrictMode>
  );
} else {
  throw new Error('Could not find root element');
}

