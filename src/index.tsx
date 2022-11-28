import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BlockchainProvider } from "../src/Components/context/BlockchainContext";
import axios from 'axios';
import { local } from 'web3modal';

// For GET requests
axios.interceptors.request.use(
  (req) => {
     // Add configurations here
     return req;
  },
  (err) => {
    if(err.response.status === 401) {
      localStorage.clear();
      alert("You have been logged out, Please log back in")
      window.location.href = '/';
    }
     return Promise.reject(err);
  }
);

// For POST requests
axios.interceptors.response.use(
  (res) => {
     // Add configurations here
     if (res.status === 201) {
        console.log('Posted Successfully');
     }
     return res;
  },
  (err) => {
    if(err.response.status === 401) {
      localStorage.clear();
      alert("You have been logged out, Please log back in")
      window.location.href = '/';
    }
     return Promise.reject(err);
  }
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <BlockchainProvider>
      <App />
      </BlockchainProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
