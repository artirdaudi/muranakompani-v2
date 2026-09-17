import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { MotionProvider } from './motion';
import './styles.css';
import './motion.css';
import './scenes.css';
import './service-pages.css';
import './page-intro.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><BrowserRouter><MotionProvider><App /></MotionProvider></BrowserRouter></React.StrictMode>
);
