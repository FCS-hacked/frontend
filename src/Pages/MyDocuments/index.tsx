import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function MyDocuments() {
 
  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        <UploadFiles />

        <BasicTable/>
      </div>
    </div>
  );
}
