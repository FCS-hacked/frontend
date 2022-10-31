import React, { Component } from 'react';
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import logo from './logo.svg';
import Information from './Pages/Information';
import Profile from './Pages/Profile';
import DisplayMyDocuments from './Pages/DisplayMyDocuments';
import DisplaySharedDocuments from './Pages/DisplaySharedDocuments';
import ShareDocuments from './Pages/ShareDocuments';
import Orders from './Pages/Orders';
import BasicTable from './Components/BasicTable';
import './App.css';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <Router>
      <Routes>
        <Route path='/' element={< Home />}></Route>
        <Route path='/login' element={< Login />}></Route>
        <Route path='/signup' element={< SignUp />}></Route>
        <Route path='/information' element={< Information />}></Route>
        <Route path='/profile' element={< Profile />}></Route>
        <Route path='/displayMyDocuments' element={< DisplayMyDocuments />}></Route>
        <Route path='/displaySharedDocuments' element={< DisplaySharedDocuments />}></Route>
        <Route path='/shareDocuments' element={< ShareDocuments />}></Route>
        <Route path='/orders' element={<Orders />}></Route>
        {/* <Route path='/table' element={<BasicTable />}></Route> */}
        {/* <Route path='/about' element={< About />}></Route>
        <Route path='/contact' element={< Contact />}></Route> */}
      </Routes>
    </Router>
  );
}

export default App;
