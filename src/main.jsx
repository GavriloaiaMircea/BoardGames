import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/components/App/App';

// const title = React.createElement(
//   'h1',
//   { title: 'test' },
//   'Hello from',
//   React.createElement('sup', {}, '1'),
//   ' React'
// );
// console.log(title);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
