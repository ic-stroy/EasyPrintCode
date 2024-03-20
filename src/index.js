import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, HashRouter, Switch } from 'react-router-dom';

ReactDOM.render(
  <StrictMode>
    <HashRouter>
      {/* <Router> */}
        <App />
      {/* </Router> */}
    </HashRouter>
  </StrictMode>,
  document.getElementById('root')
);