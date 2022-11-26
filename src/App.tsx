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
import ValidityCheck from './Pages/ValidityCheck';
// import Orders from './Pages/Orders';

import BasicTable from './Components/BasicTable1';
import Dashboard from './Pages/Dashboard';
import './App.css';
import PharmacyListing from './Pages/PharmacyListing';
import PharmacyLandingPage from './Pages/PharmacyLandingPage';
import Cart from './Pages/Cart';
import Settings from './Pages/Settings';
import UserOrders from './Pages/UserOrders';
import PharmacyOrders from './Pages/PharmacyOrders';
function App() {
  return (
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
        <Route path='/cart' element={<Cart />}></Route>
        <Route path='/validityCheck' element={<ValidityCheck />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/pharmacyListing' element={<PharmacyListing />}></Route>
        <Route path="/pharmacy" element = {<PharmacyLandingPage/>}></Route>
        <Route path="/settings" element = {<Settings/>}></Route>
        <Route path="/userOrders" element = {<UserOrders/>}></Route>
        <Route path="/pharmacyOrders" element = {<PharmacyOrders/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
