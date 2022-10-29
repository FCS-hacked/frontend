import React from 'react'
import SignedIn_NavBar from '../../Components/SignedIn_NavBar';
import BasicTable from '../../Components/BasicTable';
import axios from 'axios';
import UploadFiles from '../../Components/UploadFile';

export default function MyDocuments() {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  console.log(selectedFile, " is the selected file");

  function uploadFile() {
    if (selectedFile) {
      axios.post("http://localhost:5000/upload", {file:selectedFile, test: "x"}, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  }

  return (


    <div>
      <div>
        <SignedIn_NavBar/>
        <UploadFiles selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
        <button onClick={uploadFile}>Upload</button>
        <BasicTable/>
      </div>
    </div>
  );
}
