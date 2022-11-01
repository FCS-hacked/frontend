import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable1 from '../../Components/BasicTable1';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function MyDocuments() {
  return (
    <div>
      <div>
        <SignedIn_NavBar/>
        <BasicTable1 
          url="http://localhost:8000/documents/self/documents/"
        />
      </div>
    </div>
  );
}
