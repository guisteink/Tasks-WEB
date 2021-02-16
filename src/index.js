import React from 'react';
import ReactDOM from 'react-dom';
import Home from './views/Home'
import Task from './views/Task'
import Routes from './routes/index'

ReactDOM.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

