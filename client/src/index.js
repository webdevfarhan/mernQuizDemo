import React from 'react';
import * as Sentry from '@sentry/browser';
import ReactPixel from 'react-facebook-pixel';
import ReactDOM from 'react-dom';
import 'w3-css/w3.css';
import App from './App';

Sentry.init({ dsn: 'https://02efc7364764498bb0a023ded9829080@sentry.io/1502997' });
ReactPixel.init('378446236175820');
ReactPixel.init('2377210045933547');
window.atOptions = {
  key: '085e9ff1bfff33f5efc41d4c169b8f55',
  format: 'iframe',
  height: 250,
  width: 300,
  params: {}
};
ReactDOM.render(<App />, document.getElementById('root'));
