import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
export default function SharedDocuments() {
  return (
    <div>
      <div>
        <SignedIn_NavBar/>
        <BasicTable/>
      </div>
    </div>
  );
}
