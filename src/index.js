import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import './css/site.css';
import './css/bootstrap.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

require('./font-awesome/css/font-awesome.min.css');
ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
