import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Import the root component
import './index.css';       // Import global styles (optional)

// 1. Get the root element from index.html (usually <div id="root"></div>)
const rootElement = document.getElementById('root');

// 2. Create the React 18 root instance
ReactDOM.createRoot(rootElement).render(
  // 3. Use StrictMode for development checks
  <React.StrictMode>
    {/* 4. Render the main application component */}
    <App />
  </React.StrictMode>
);
