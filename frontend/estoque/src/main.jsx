import React from 'react';
import ReactDOM from 'react-dom'; // Importe ReactDOM corretamente
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Importe BrowserRouter, Routes e Route do 'react-router-dom'
import App from './App.jsx';
import './index.css';
import AllRoutes from './components/AllRoutes.jsx';

ReactDOM.render(
  <React.StrictMode>
    <Router> 
      <App />
    <AllRoutes/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
