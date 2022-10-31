import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function SharedDocuments() {
  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        {/* <UploadFiles selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <button onClick={uploadFile}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10"
        >Upload</button> */}
        <BasicTable 
          url="http://localhost:8000/documents/documents-shared/"
        />
      </div>
    </div>
  );
}

