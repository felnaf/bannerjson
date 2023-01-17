import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import reducers from './reducers';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);
const store = configureStore({ reducer: reducers });
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {' '}
      <App />
    </BrowserRouter>
  </Provider>
);
