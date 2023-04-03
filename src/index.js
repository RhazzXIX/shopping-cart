import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import RouteSwitch from './RouteSwitch';

const root = ReactDOM.createRoot(document.getElementById('root'));
console.log(RouteSwitch.props.router)
root.render(
  <React.StrictMode>
    {RouteSwitch}
  </React.StrictMode>
);
