import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import global styles (optional)

// Use ReactDOM.createRoot for React 18 concurrent features
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* The main component of your application */}
    <App />
  </React.StrictMode>
);
