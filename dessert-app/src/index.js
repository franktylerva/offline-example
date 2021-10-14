import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PouchDB from 'pouchdb-browser';
import { Provider } from 'use-pouchdb';

const db = new PouchDB('desserts');

const remoteDatabase = new PouchDB("http://localhost:5984/desserts");

PouchDB.sync(db, remoteDatabase, {
  live: true,
  heartbeat: false,
  timeout: false,
  retry: true
});

ReactDOM.render(
  <React.StrictMode>
    <Provider pouchdb={db}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
