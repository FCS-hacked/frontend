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
          url={process.env.REACT_APP_BACKEND_URL + "/documents/self/documents/"}
        />
      </div>
    </div>
  );
}
